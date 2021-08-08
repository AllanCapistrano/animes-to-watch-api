/**
 * Verifica se as categorias da requisição são as mesmas relacionadas com o
 * anime no Banco de Dados.
 * @param categories string[]
 * @param categoriesIds string[]
 * @returns boolean
 */
export const hasDifferentCategories = (
  categories: string[],
  categoriesIds: string[]
): boolean => {
  if (categories.length !== categoriesIds.length) {
    return true;
  }

  let flag: boolean = false;

  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < categoriesIds.length; j++) {
      if (categories[i] === categoriesIds[j]) {
        break;
      }

      if (j === categoriesIds.length - 1) {
        flag = true;
      }
    }
  }

  return flag;
};
