import Framework7 from 'framework7';

declare module 'framework7' {
  interface Framework7 {
    keypad: {
      create: (options: any) => any;
    };
  }
}