import { router } from "expo-router";

export const actions = {
    back: {icon: "chevron-left", fn: () => { router.back() }},
    notification: { icon: 'notifications', fn: () => { router.push('/notifications'); } },
    editProfile: { icon: 'edit', fn: () => { router.push('/edit-profile') } }
} satisfies Record<string, {icon: MaterialIconName, fn?: () => void}>