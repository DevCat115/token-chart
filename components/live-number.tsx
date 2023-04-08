import React from 'react';
import numeral from 'numeral';
import { cn } from '@/lib/utils';

interface LiveNumberProps {
  num: number;
  format?: string;
  live?: boolean;
  className?: string;
  sign?: boolean;
}

const getColorClass = (value: number): string => {
  if (value > 0) return 'text-green-600';
  if (value < 0) return 'text-red-600';

  return ''; // Return an empty string if value is 0 or not a valid number
};

const formatNumber = (num: number, format: string, shouldSign: boolean): string => {
  const formattedNum = numeral(num).format(format).toUpperCase();

  if (!shouldSign || num === 0) return formattedNum;
  const sign = num > 0 ? '+' : '';

  return `${sign}${formattedNum}`;
};

const ZeroExponent = ({ num }: { num: number }) => {
  const expForm = num.toExponential(2);
  const [base, exponent] = expForm.split('e-');
  const significantDigits = base.replace('.', '').substring(0, 3);

  return (
    <span>
      0.0<sup className="text-[10px]">{Number(exponent) - 2}</sup>
      {significantDigits}
    </span>
  );
};

const LiveNumber: React.FC<LiveNumberProps> = ({
  num,
  format = '0,0.00a',
  live = false,
  className,
  sign = false,
}) => {
  const normalizedNum = parseFloat(Number(num).toFixed(10));

  if (normalizedNum > 0 && normalizedNum < 0.0001) {
    return <ZeroExponent num={normalizedNum} />;
  }

  const displayNum = formatNumber(num, format, sign);
  const colorClass = getColorClass(num);
  const finalClassName = live ? cn(className, colorClass) : className;

  return <span className={finalClassName}>{displayNum}</span>;
};

export default LiveNumber;
