import { GETTING_STARTED_GUIDE_URL } from '@/commons/constants';
import useMountedState from '@/hooks/useMountedState';
import useDnDStore from '@/stores/useDnDStore';
import Image from 'next/image';
import React from 'react';

type ButtonProps = React.HTMLProps<HTMLDivElement> & {
  name: string;
};
const Button: React.FC<ButtonProps> = (props) => {
  return (
    <div {...props}>
      <div className="bg-gray-100 border border-gray-300 rounded skew-x-12 cursor-pointer hover:bg-gray-200 hover:border-gray-400 inline-block">
        <p className="-skew-x-12 pr-8 pl-2 text-gray-700 font-medium text-sm">{props.name}</p>
      </div>
    </div>
  );
};
const EmptyWorkstation = () => {
  const { nodes } = useDnDStore();
  const isMounted = useMountedState();
  const [panelVisible, setPanelVisible] = React.useState(true);

  const onNodeDragOver: React.DragEventHandler<HTMLDivElement> = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setPanelVisible(false);
    },
    [],
  );

  const onClickNewProject = () => setPanelVisible(false);
  const onClickGettingStartedGuide = () => {
    window.open(GETTING_STARTED_GUIDE_URL, '_blank');
  };

  if (!panelVisible || !isMounted()) return <></>;
  if (isMounted() && nodes.length) return <></>;
  return (
    <div
      className="flex w-[calc(100vw-320px)] justify-center items-center top-0 mt-11 h-[calc(100vh-44px)] absolute px-12 xl:px-64 z-10"
      draggable={false}
      onDragEnterCapture={onNodeDragOver}
    >
      <div>
        <div className="flex flex-col items-center justify-center opacity-60">
          <Image priority src={'/x-force-ide.svg'} width={217} height={69} alt="software 2.0" draggable={false} />
          <p className="text-bold text-2xl pt-6">
            Create task specific agent workforces for your custom business logic using diagrams.
          </p>
          <p className="font-medium pt-12 whitespace-pre-line">
            You can drag and drop agents from the &quot;Library&quot; to here, connect them whatever you like, give them
            an initial task, export them as a Python Script and run it on your local machine.
            {'\n\n'}
            To learn more, follow our{' '}
            <span className="text-blue-500 cursor-pointer underline" onClick={onClickGettingStartedGuide}>
              Getting Started
            </span>{' '}
            guide.
            {'\n\n\n'}
            We support enterprises by providing them Cloud Runs with our operating system build to run LLMs. Contact us
            to learn more{' '}
            <a
              className="text-blue-500 cursor-pointer underline"
              href="mailto:enterprise-support@x-force.ai"
              draggable={false}
            >
              enterprise-support@x-force.ai
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col pt-12 opacity-75">
          <Button name={'New Project'} onClick={onClickNewProject} />
          <Button name={'Getting Started Guide'} className="pt-1" onClick={onClickGettingStartedGuide} />
        </div>
      </div>
    </div>
  );
};

export default EmptyWorkstation;
