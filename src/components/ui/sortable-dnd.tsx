import { ReactNode } from 'react';

import {
  useSensor,
  DndContext,
  useSensors,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

interface SortableDndProps<T extends { id: string }> {
  data: T[];
  onReorder: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

interface ItemProps {
  id: string | number;
  content: ReactNode;
}

export function SortableDnd<T extends { id: string }>({
  data,
  onReorder,
  renderItem,
}: SortableDndProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = data.findIndex((item) => item.id === active.id);
    const newIndex = data.findIndex((item) => item.id === over.id);
    onReorder(arrayMove(data, oldIndex, newIndex));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={data.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        {data.map((item, index) => (
          <SortableDndItem
            key={item.id}
            id={item.id}
            content={renderItem(item, index)}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}

function SortableDndItem({ id, content }: ItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Box
      sx={() => ({
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        paddingY: 1,
        paddingX: 2,
        boxShadow:
          '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);',
      })}
      ref={setNodeRef}
      style={style}
      {...attributes} // Keep accessibility attributes, but not drag listeners here
    >
      {/* ...listeners: attach drag listeners only to the IconButton */}
      {/* touchAction: 'none' disables default browser touch behaviors like scrolling on the IconButton, ensuring @dnd-kit’s PointerSensor can fully control drag-and-drop without interference. */}
      <IconButton sx={{ cursor: 'grab', touchAction: 'none' }} {...listeners}>
        <DragIndicatorIcon />
      </IconButton>
      {content}
    </Box>
  );
}
