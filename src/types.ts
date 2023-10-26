import { MouseEvent as ReactMouseEvent } from 'react';

export type HandleClickType = (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
