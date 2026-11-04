declare namespace React {
  export type FC<P = {}> = (props: P) => any;
  export interface RefObject<T> {
    readonly current: T | null;
  }
}

declare module 'react' {
  export function useRef<T>(initialValue: T | null): { current: T | null };
  export type FC<P = {}> = (props: P) => any;
  const React: {
    useRef: typeof useRef;
    FC: typeof FC;
  };
  export default React;
}

declare module 'framer-motion' {
  export const motion: any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
