import { animate } from "motion";

export function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function nullgetter<T>(): T | null {
    return null;
}

export async function flip(elements: HTMLElement[], layout_changes: () => Promise<void>): Promise<void> {
    const prev_bounding_rects = elements.map((e) => e.getBoundingClientRect());
    await layout_changes();
    for (let i = 0; i < elements.length; i += 1) {
        const after_bounding_rect = elements[i].getBoundingClientRect();
        const dx = prev_bounding_rects[i].x - after_bounding_rect.x;
        const dy = prev_bounding_rects[i].y - after_bounding_rect.y;
        elements[i].style.transform = `translate(${dx}px, ${dy}px)`;
        animate(elements[i], {
            x: [dx, 0],
            y: [dy, 0],
        });
    }
}