import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '../../ui/box';
import Button from '../../ui/button';
import Typography from '../../ui/typography/typography';
import {
  COLORS,
  TYPOGRAPHY,
  TEXT_ALIGN,
  BLOCK_SIZES,
  JUSTIFY_CONTENT,
  FLEX_DIRECTION,
  ALIGN_ITEMS,
  DISPLAY,
  SIZES,
} from '../../../helpers/constants/design-system';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { getEnvironmentType } from '../../../../app/scripts/lib/util';
import { ENVIRONMENT_TYPE_POPUP } from '../../../../shared/constants/app';

export default function CollectiblesList({ onAddNFT, onRefreshList }) {
  const t = useI18nContext();
  const blockSizes = {
    copy:
      getEnvironmentType() === ENVIRONMENT_TYPE_POPUP
        ? BLOCK_SIZES.TWO_THIRDS
        : BLOCK_SIZES.ONE_THIRD,
    button:
      getEnvironmentType() === ENVIRONMENT_TYPE_POPUP
        ? BLOCK_SIZES.HALF
        : BLOCK_SIZES.ONE_FIFTH,
  };

  const collections = {
    Opensea: {
      icon: './images/opensea-icon.svg',
      collectibles: [
        { icon: './images/kitty-1.svg', backgroundColor: COLORS.PRIMARY1 },
        { icon: './images/kitty-2.svg', backgroundColor: COLORS.ALERT3 },
        { icon: './images/kitty-3.svg', backgroundColor: COLORS.SUCCESS1 },
        { icon: './images/kitty-1.svg', backgroundColor: COLORS.ERROR3 },
      ],
    },
    CryptoKitties: {
      icon: './images/opensea-icon.svg',
      collectibles: [
        { icon: './images/kitty-1.svg', backgroundColor: COLORS.PRIMARY1 },
        { icon: './images/kitty-2.svg', backgroundColor: COLORS.ALERT3 },
      ],
    },
  };

  const defaultDropdownState = {};
  Object.keys(collections).forEach((key) => (defaultDropdownState[key] = true));
  const [dropdownState, setDropdownState] = useState(defaultDropdownState);

  return (
    <Box
      padding={[4, 6, 4, 6]}
      className="collectibles-list"
      flexDirection={FLEX_DIRECTION.COLUMN}
    >
      {Object.keys(collections).length > 0 ? (
        <>
          {Object.keys(collections).map((key, index) => {
            const { icon, collectibles } = collections[key];
            const isExpanded = dropdownState[key];

            return (
              <div key={`collection-${index}`}>
                <Box
                  marginTop={4}
                  marginBottom={4}
                  display={DISPLAY.FLEX}
                  alignItems={ALIGN_ITEMS.CENTER}
                  justifyContent={JUSTIFY_CONTENT.SPACE_BETWEEN}
                >
                  <Box alignItems={ALIGN_ITEMS.FLEX_START}>
                    <img width="28" src={icon} />
                    <Typography
                      marginLeft={2}
                      color={COLORS.BLACK}
                      variant={TYPOGRAPHY.H4}
                    >
                      {`${key} (${collectibles.length})`}
                    </Typography>
                  </Box>
                  <Box alignItems={ALIGN_ITEMS.FLEX_END}>
                    <i
                      className={`fa fa-lg fa-chevron-${
                        isExpanded ? 'down' : 'right'
                      }`}
                      onClick={() => {
                        setDropdownState((_dropdownState) => ({
                          ..._dropdownState,
                          [key]: !isExpanded,
                        }));
                      }}
                    />
                  </Box>
                </Box>
                {isExpanded ? (
                  <Box display={DISPLAY.FLEX}>
                    {collectibles.map((collectible, i) => {
                      return (
                        <Box
                          marginRight={4}
                          borderRadius={SIZES.MD}
                          key={`collectible-${i}`}
                          width={BLOCK_SIZES.ONE_SIXTH}
                          backgroundColor={collectible.backgroundColor}
                        >
                          <img src={collectible.icon} />
                        </Box>
                      );
                    })}
                  </Box>
                ) : null}
              </div>
            );
          })}
          <Box
            marginTop={6}
            flexDirection={FLEX_DIRECTION.COLUMN}
            justifyContent={JUSTIFY_CONTENT.CENTER}
          >
            <Typography
              color={COLORS.UI3}
              variant={TYPOGRAPHY.H5}
              align={TEXT_ALIGN.CENTER}
            >
              {t('missingNFT')}
            </Typography>
            <Box
              alignItems={ALIGN_ITEMS.CENTER}
              justifyContent={JUSTIFY_CONTENT.CENTER}
            >
              <Box justifyContent={JUSTIFY_CONTENT.FLEX_END}>
                <Button
                  type="link"
                  onClick={onRefreshList}
                  style={{ padding: '5px' }}
                >
                  {t('refreshList')}
                </Button>
              </Box>
              <Typography
                color={COLORS.UI3}
                variant={TYPOGRAPHY.H4}
                align={TEXT_ALIGN.CENTER}
              >
                {t('or')}
              </Typography>
              <Box justifyContent={JUSTIFY_CONTENT.FLEX_START}>
                <Button
                  type="link"
                  onClick={onAddNFT}
                  style={{ padding: '5px' }}
                >
                  {t('addNFT').toLowerCase()}
                </Button>
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Box justifyContent={JUSTIFY_CONTENT.CENTER}>
            <img src="./images/diamond.png" />
          </Box>
          <Typography
            color={COLORS.UI3}
            variant={TYPOGRAPHY.H3}
            align={TEXT_ALIGN.CENTER}
          >
            {t('noNFTs')}
          </Typography>
          <Box justifyContent={JUSTIFY_CONTENT.CENTER}>
            <Box width={blockSizes.copy}>
              <Typography
                color={COLORS.UI3}
                variant={TYPOGRAPHY.H5}
                align={TEXT_ALIGN.CENTER}
              >
                {t('noNFTsDetails')}
              </Typography>
            </Box>
          </Box>
          <Box marginTop={6} justifyContent={JUSTIFY_CONTENT.CENTER}>
            <Box width={blockSizes.button}>
              <Button type="primary" onClick={onAddNFT}>
                {t('addNFT')}
              </Button>
            </Box>
          </Box>
          <Box marginTop={2}>
            <Button
              href="https://community.metamask.io/"
              target="_blank"
              type="link"
              rel="noopener noreferrer"
            >
              {t('learnMore')}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}

CollectiblesList.propTypes = {
  onAddNFT: PropTypes.func.isRequired,
  onRefreshList: PropTypes.func.isRequired,
};