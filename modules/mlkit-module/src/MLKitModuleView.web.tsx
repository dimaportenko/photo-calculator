import * as React from 'react';

import { MLKitModuleViewProps } from './MLKitModule.types';

export default function MLKitModuleView(props: MLKitModuleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
