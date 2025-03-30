// LOCAL
const BASE_URL = 'http://localhost:5000/api/v1';
// const BASE_URL = 'https://astrological-dictionary-backend.onrender.com/api/v1';

export const ROUTES = {
  ASTROLOGICAL_TERM: `${BASE_URL}` + '/home/astrology/{letter}',
  DREAM_TERM: `${BASE_URL}` + '/home/dream/{letter}',
  ASTROLOGICAL_DICTIONARY: `${BASE_URL}` + '/admin/astrological-dictionary',
  ADD_ASTROLOGICAL_DICTIONARY:
    `${BASE_URL}` + '/admin/astrological-dictionary/save',
  DELETE_ASTROLOGICAL_DICTIONARY:
    `${BASE_URL}` + '/admin/astrological-dictionary/delete',
  EDIT_ASTROLOGICAL_DICTIONARY:
    `${BASE_URL}` + '/admin/astrological-dictionary/edit',
  DREAM_DICTIONARY: `${BASE_URL}` + '/admin/dream-dictionary',
  ADD_DREAM_DICTIONARY: `${BASE_URL}` + '/admin/dream-dictionary/save',
  DELETE_DREAM_DICTIONARY: `${BASE_URL}` + '/admin/dream-dictionary/delete',
  EDIT_DREAM_DICTIONARY: `${BASE_URL}` + '/admin/dream-dictionary/edit',
  ZODIAC_SIGN: `${BASE_URL}` + '/admin/zodiac-sign',
  ZODIAC_SIGN_DETAILS: `${BASE_URL}` + '/admin/zodiac-sign-details/{termName}',
  ADD_ZODIAC_SIGN: `${BASE_URL}` + '/admin/zodiac-sign/save',
  DELETE_ZODIAC_SIGN: `${BASE_URL}` + '/admin/zodiac-sign/delete',
  EDIT_ZODIAC_SIGN: `${BASE_URL}` + '/admin/zodiac-sign/edit',
  SIGNIN: `${BASE_URL}` + '/signin',
};
