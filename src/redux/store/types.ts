import {UniverseState} from '~/redux/store/slices/universe/types';
import {FighterState} from '~/redux/store/slices/fighter/types';
import {FilterState} from '~/redux/store/slices/filter/types';
import {GlobalState} from './slices/global/types';

export enum STATUS {
  NONE = 'none',
  SUCCESS = 'fulfilled',
  PENDING = 'pending',
  ERROR = 'rejected',
}

export interface ReduxState {
  universe: UniverseState;
  fighter: FighterState;
  filter: FilterState;
  global: GlobalState;
}
