import React from 'react';


export const PrivacyOption = ({ type, form, PRIVACY_TYPE, onSelected, children }: {
    type: string;
    form: any;
    PRIVACY_TYPE: string;
    onSelected: (type: string) => void;
    children: React.ReactNode;
}) => (
  <div
    className={`border border-dashed flex flex-col p-2 gap-2 rounded-sm justify-center items-center aspect-video hover:border-accent-secondary ${form.getValues('scope') === type ? 'border-accent-secondary' : ''}`}
    onClick={() => onSelected(type)}
  >
        {children}
  </div>
);