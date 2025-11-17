import { userService as realUserService } from './api';
import { userService as dummyUserService } from './localUserService';

const USE_LOCAL_DATA = true;

export const userService = USE_LOCAL_DATA ? dummyUserService : realUserService;
