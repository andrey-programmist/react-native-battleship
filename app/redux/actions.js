export const UPDATE_SHIPTYPES = '[shipTypes] Update';
export const UPDATE_LAYOUT = '[layout] Update';
export const BATTLE_FIRE = '[battle] Fire!';

export const UpdateShipTypes = payload => ({
  type: UPDATE_SHIPTYPES,
  payload,
});

export const UpdateLayout = payload => ({
  type: UPDATE_LAYOUT,
  payload,
});

export const Fire = position => ({
  type: BATTLE_FIRE,
  position,
});
