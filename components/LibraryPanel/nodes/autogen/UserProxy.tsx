import FieldSchema, { InputField } from '@/components/LibraryPanel/nodes/Fields';
import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/LibraryPanel/nodes/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';
import { XForceNodesEnum } from '../nodeTypes';

const UserProxy: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { addNodeData } = useDnDStore();
  const { getNode } = useReactFlow();
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const data = getNode(props.id)?.data;
  const onVarNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addNodeData(props.id, { variableName: val });
    },
    [addNodeData, props.id],
  );
  const onPromptChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value;
      addNodeData(props.id, { initialPrompt: val });
    },
    [addNodeData, props.id],
  );

  return (
    <div className="rounded-sm border border-gray-200 bg-white w-80">
      <div className={`${XForceNodesEnum.USER_PROXY} flex justify-between items-center border-b border-gray-200 py-2`}>
        <div className="font-bold ml-2">UserProxy</div>
        <InformationCircleIcon
          width={24}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="UserProxy" />}
            content={
              <DefaultContent
                name="UserProxy"
                description="is a proxy agent for the user, that can execute
                code and provide feedback to the other agents. By default, the agent will prompt for human input every
                time a message is received. Code execution is enabled by default. LLM-based auto reply is disabled by default."
                docTeaser="Agent Name: Name of the agent."
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="pb-2 px-2 bg-gray-50">
        <FieldSchema
          field={
            <InputField
              label="Agent Name"
              required
              onChange={onVarNameChange}
              value={data?.variableName}
              type="text"
              placeholder="user_proxy"
            />
          }
          errors={errors?.[props.id]?.variableName}
        />
        <FieldSchema
          field={
            <InputField
              label="Initial Prompt"
              placeholder="Do a research about how..."
              required
              onChange={onPromptChange}
              value={data?.initialPrompt}
              type="text"
            />
          }
          errors={errors?.[props.id]?.initialPrompt}
        />
      </div>

      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default UserProxy;
