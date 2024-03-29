import React, {useCallback, useEffect, useRef} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useTheme} from '~/theme';
import {Filter} from '~/pages/Filter';
import {Onboarding} from '~/pages/Onboarding';
import {Modal} from '~/components/commons/Modal';
import {useResource} from '~/redux/store/hooks';
import {Header} from '~/components/commons/Header';
import {WARNS} from '~/redux/store/slices/global/types';
import {ModalRefProps} from '~/components/commons/Modal/types';
import {BaseButton} from '~/components/commons/BaseButton';
import {UniverseList} from '~/components/pages/Home/UniverseList';
import {FightersList} from '~/components/pages/Home/FightersList';

import * as S from './styles';

export const Home = () => {
  const palette = useTheme().palette;
  const platform = useTheme().platform;
  const global = useResource('global');

  const filterModalRef = useRef<ModalRefProps>(null);
  const onboardingModalRef = useRef<ModalRefProps>(null);

  const onOpenFilter = useCallback(() => {
    filterModalRef.current?.open();
  }, [filterModalRef]);

  const onCloseFilter = useCallback(() => {
    filterModalRef.current?.close();
  }, [filterModalRef]);

  const onCloseOnboarding = useCallback(() => {
    onboardingModalRef.current?.close();
  }, [onboardingModalRef]);

  useEffect(() => {
    const exist = global.warns[WARNS.ONBOARDING];

    if (!exist) {
      onboardingModalRef.current?.open();
    }
  }, [global.warns]);

  return (
    <S.Container>
      <Header
        title={'Fighters'}
        justifyContent={'space-between'}
        rightChild={
          <BaseButton onPress={onOpenFilter}>
            <MaterialIcon
              size={26}
              name={'filter-list'}
              color={platform.ios ? palette.secondaryText : palette.primaryText}
            />
          </BaseButton>
        }
      />

      <UniverseList />

      <FightersList />

      <Modal ref={onboardingModalRef} animationType={'slide'}>
        <Onboarding onClose={onCloseOnboarding} />
      </Modal>

      <Modal ref={filterModalRef} animationType={'slide'}>
        <Filter onClose={onCloseFilter} />
      </Modal>
    </S.Container>
  );
};
