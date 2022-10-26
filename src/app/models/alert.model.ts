export type Alert = {
  type: 'primary' | 'alert' | 'warning' | 'info';
  msg: string;
  params?: any;
};
