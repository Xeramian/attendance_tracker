import { ComponentProps } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

declare global {
    type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];
}