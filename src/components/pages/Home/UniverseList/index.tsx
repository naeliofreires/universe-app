import React, {useCallback, useEffect, useMemo} from 'react';
import {observer} from 'mobx-react-lite';

import {useDispatch} from 'react-redux';
import {STATUS} from '~/redux/store/types';
import {Text} from '~/components/commons/Text';
import {useResource} from '~/redux/store/hooks';
import {Universe} from '~/components/commons/Universe';
import {BaseButton} from '~/components/commons/BaseButton';
import {getAllUniverses} from '~/redux/store/slices/universe/services';

import * as S from './style';

export const UniverseList = observer(() => {
  const dispatch = useDispatch();
  const {data, status} = useResource('universe');

  useEffect(() => {
    dispatch(getAllUniverses());
  }, [dispatch]);

  const reload = useCallback(() => {
    dispatch(getAllUniverses());
  }, [dispatch]);

  const renderUniverses = useMemo(
    () => data.map(u => <Universe key={u.objectID} {...u} />),
    [data],
  );

  return (
    <>
      {status === STATUS.ERROR && (
        <S.FeedbackErrorBox>
          <BaseButton onPress={reload}>
            <Text
              color={'tertiaryText'}
              typography={'tertiaryFont'}
              value={'Sorry, an error occurred. '}>
              <Text
                value={'Click to try again'}
                color={'primaryColor'}
                typography={'tertiaryFont'}
              />
            </Text>
          </BaseButton>
        </S.FeedbackErrorBox>
      )}

      {status === STATUS.SUCCESS && (
        <S.ScrollContainer>
          <Universe objectID={0} name={'All'} description={'default'} />
          {renderUniverses}
        </S.ScrollContainer>
      )}
    </>
  );
});
