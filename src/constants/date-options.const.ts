/**
 * 取得年份的選項
 */
export const getYearOptions = (): string[] => {
  const options = [];
  const currentYear = new Date().getFullYear();
  for (let i = 1911; i <= currentYear; i++) {
    options.push(i.toString());
  }
  return options;
};

/**
 * 取得月份的選項
 */
export const getMonthOptions = (): string[] => {
  const options = [];
  for (let i = 1; i <= 12; i++) {
    options.push(i.toString());
  }
  return options;
};

/**
 * 用年份跟月份來取得日期的選項
 *
 * @param year 年份
 * @param month 月份
 */
export const getDayOptions = (year: string, month: string): string[] => {
  const options = [];
  const date = new Date(parseInt(year), parseInt(month), 0);
  for (let i = 1; i <= date.getDate(); i++) {
    options.push(i.toString());
  }
  return options;
};
