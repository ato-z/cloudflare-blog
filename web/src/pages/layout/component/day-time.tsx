import { Typography } from 'antd';
import './day-time.scss';
import am1 from '@web/assets/icon-times/am1.svg';
import am2 from '@web/assets/icon-times/am2.svg';
import pm1 from '@web/assets/icon-times/pm1.svg';
import pm2 from '@web/assets/icon-times/pm2.svg';
import { fillZero } from '@web/helper';
import { useTheme } from '@web/store/theme';
import { useCallback, useEffect, useState } from 'react';

const days = [am1, am2, pm1, pm2];
export const DayTime = () => {
  const [step, setStep] = useState(0);
  const [time, setTime] = useState('');
  const [theme, setTheme] = useTheme();

  const dayStepRun = useCallback(() => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    // icon 图标
    if (hours >= 16) {
      setStep(2);
    } else if (hours >= 12) {
      setStep(1);
    } else if (hours >= 6) {
      setStep(0);
    } else {
      setStep(3);
    }

    // 时钟
    if (hours >= 12) {
      setTime(`${fillZero(hours % 12)}:${fillZero(minutes)} PM`);
    } else {
      setTime(`${fillZero(hours % 12)}:${fillZero(minutes)} AM`);
    }

    // 主题
    if (hours >= 20 && theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('light');
    }

    clearTimeout(Reflect.get(window, '___dayStep'));
    const timer = setTimeout(dayStepRun, 60000);
    Reflect.set(window, '___dayStep', timer);
  }, [setStep, setTime, time, theme, setTheme]);

  useEffect(() => {
    dayStepRun();
  }, [dayStepRun]);

  return (
    <div className="day-sider">
      <Typography.Text className="right">{time}</Typography.Text>
      <img src={days[step] ?? am2} className={'icon ' + 'step' + step} />
    </div>
  );
};
