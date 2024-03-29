export const pageTitle = (state = '', { type, text }) => {
  switch (type) {
    case 'CHANGE_TITLE':
      return text;
    default:
      return state;
  }
};


export const secondaryNav = (state = 'search', { type, text }) => {
  switch (type) {
    case 'CHANGE_NAV':
      return text;
    default:
      return state;
  }
};


export const pageSearch = (state = '', { type, text }) => {
  switch (type) {
    case 'CHANGE_SEARCH_TEXT':
      return text;
    default:
      return state;
  }
};


export const examsPageSettings = (state = {}, { type, payload }) => {
  switch (type) {
    case 'CHANGE_EXAM_ID':
      return Object.assign({}, state, { id: payload.id });
    default:
      return state;
  }
};
