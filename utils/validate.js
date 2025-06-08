// 문자열 필수 필드 검증
export function validateStringField(field, fieldName) {
  if (!field || typeof field !== "string") {
    const error = new Error(`${fieldName}은 문자열이며 필수입니다.`);
    error.statusCode = 400;
    throw error;
  }
}

// 숫자 필드 검증
export function validateNumberField(field, fieldName, min = 0) {
  if (field == null || typeof field !== "number" || field < min) {
    const error = new Error(`${fieldName}은 ${min} 이상의 숫자여야 합니다.`);
    error.statusCode = 400;
    throw error;
  }
}

// 배열 필드 검증
export function validateStringArray(field, fieldName) {
  if (field && !Array.isArray(field)) {
    const error = new Error(`${fieldName}는 문자열 배열이어야 합니다.`);
    error.statusCode = 400;
    throw error;
  }
}
