import { Flex } from '@chakra-ui/react';

import { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/store';

import { setCfgScale, setSampler, setThreshold, setPerlin, setSteps, OptionsState } from '../options/optionsSlice';


import { SAMPLERS } from '../../app/constants';
import { createSelector } from '@reduxjs/toolkit';
import { isEqual } from 'lodash';
import { ChangeEvent } from 'react';
import SDNumberInput from '../../common/components/SDNumberInput';
import SDSelect from '../../common/components/SDSelect';

const optionsSelector = createSelector(
  (state: RootState) => state.options,
  (options: OptionsState) => {
    return {
      steps: options.steps,
      cfgScale: options.cfgScale,
      sampler: options.sampler,
      threshold: options.threshold,
      perlin: options.perlin,
    };
  },
  {
    memoizeOptions: {
      resultEqualityCheck: isEqual,
    },
  }
);

/**
 * Sampler options. Includes steps, CFG scale, sampler.
 */
const SamplerOptions = () => {

  const dispatch = useAppDispatch();
  const { steps, cfgScale, sampler, threshold, perlin } = useAppSelector(optionsSelector);

  const handleChangeSteps = (v: string | number) =>
    dispatch(setSteps(Number(v)));

  const handleChangeCfgScale = (v: string | number) =>
    dispatch(setCfgScale(Number(v)));

  const handleChangeSampler = (e: ChangeEvent<HTMLSelectElement>) =>
    dispatch(setSampler(e.target.value));

  const handleChangeThreshold = (v: string | number) =>
    dispatch(setThreshold(Number(v)));

  const handleChangePerlin = (v: string | number) =>
    dispatch(setPerlin(Number(v)));

  return (
    <Flex gap={2} direction={'column'}>
      <SDNumberInput
        label="Steps"
        min={1}
        step={1}
        precision={0}
        onChange={handleChangeSteps}
        value={steps}
      />
      <SDNumberInput
        label="CFG scale"
        step={0.5}
        onChange={handleChangeCfgScale}
        value={cfgScale}
      />
      <SDSelect
        label="Sampler"
        value={sampler}
        onChange={handleChangeSampler}
        validValues={SAMPLERS}
      />
      <SDNumberInput
          label='Threshold'
          min={0}
          step={0.1}
          onChange={handleChangeThreshold}
          value={threshold}
      />
      <SDNumberInput
          label='Perlin'
          min={0}
          max={1}
          step={0.05}
          onChange={handleChangePerlin}
          value={perlin}
      />
    </Flex>
  );
};

export default SamplerOptions;