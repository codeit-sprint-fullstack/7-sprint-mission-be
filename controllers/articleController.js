const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

exports.createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: "모든 필드에 입력해주세요." });
    }
    const notice = await prisma.article.create({
      data: {
        title,
        content,
      },
    });
    return res.status(201).json(notice);
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

exports.getArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.findUnique({
      where: { id },
      select: {
        id,
        title,
        content,
        createdAt,
      },
    });
    if (!article) {
      return res.status(404).json({ error: "해당 상품을 찾을 수 없습니다. " });
    }
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

exports.patchArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const fields = ["title", "description", "img"];
    const fieldsData = {};

    for (const otherField of fields) {
      if (req.body[otherField] !== undefined) {
        fieldsData[otherField] = req.body[otherField];
      }
    }
    if (Object.keys(fieldsData).length === 0) {
      return res.status(400).json({ error: "수정할 내용이 없습니다." });
    }
    const article = await prisma.article.update({
      where: { id },
      data: fieldsData,
    });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const article = await prisma.article.delete({
      where: { id },
    });
    return res.status(200).json({ message: "상품이 삭제되었습니다. " });
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

exports.getArticleList = async (req, res) => {
  try {
    const { offset = 0, limit = 10, sort = "recent", search = "" } = req.query;

    const article = await prisma.article.findMany({
      where: {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { content: { contains: search, mode: "insensitive" } },
        ],
      },
      orderBy: sort === "recent" ? { createdAt: "desc" } : undefined,
      skip: Number(offset),
      take: Number(limit),
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
      },
    });
    return res.status(200).json(article);
  } catch (error) {
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};
