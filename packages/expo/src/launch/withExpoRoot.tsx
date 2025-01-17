import * as React from 'react';

import { InitialProps } from './withExpoRoot.types';

// This hook can be optionally imported because __DEV__ never changes during runtime.
// Using __DEV__ like this enables tree shaking to remove the hook in production.
let useDevKeepAwake: (tag?: string) => void = () => {};

if (__DEV__) {
  try {
    // Optionally import expo-keep-awake
    const { useKeepAwake, ExpoKeepAwakeTag } = require('expo-keep-awake');
    useDevKeepAwake = () => useKeepAwake(ExpoKeepAwakeTag, { suppressDeactivateWarnings: true });
  } catch {}
}

export default function withExpoRoot<P extends InitialProps>(
  AppRootComponent: React.ComponentType<P>
): React.ComponentType<P> {
  return function ExpoRoot(props: P) {
    useDevKeepAwake();

    return <AppRootComponent {...props} />;
  };
}
