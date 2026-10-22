"use client";

import { useEffect, type RefObject } from "react";

// "Clique e arraste" com o mouse num container de rolagem horizontal.
// O toque já rola nativamente; aqui só tratamos o ponteiro do mouse, e só quando há o que rolar.
export function useDragScroll(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let dragging = false;
    let moved = false;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || el.scrollWidth <= el.clientWidth) return;
      dragging = true;
      moved = false;
      startX = lastX = e.clientX;
      startScroll = el.scrollLeft;
      lastT = performance.now();
      velocity = 0;
    };

    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 5) {
        moved = true;
        el.setPointerCapture(e.pointerId);
        // Sem snap durante o arraste, senão o navegador "puxa" o scroll de volta
        el.style.scrollSnapType = "none";
        el.style.scrollBehavior = "auto";
        el.style.cursor = "grabbing";
        el.style.userSelect = "none";
      }
      if (!moved) return;
      el.scrollLeft = startScroll - dx;
      const now = performance.now();
      velocity = (e.clientX - lastX) / Math.max(now - lastT, 1);
      lastX = e.clientX;
      lastT = now;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (!moved) return;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      el.style.cursor = "";
      el.style.userSelect = "";
      // Inércia curta e volta do snap, que alinha no card mais próximo
      el.scrollBy({ left: -velocity * 220, behavior: "smooth" });
      // O clique (se houver) chega logo após o pointerup; depois disso o próximo clique volta a valer
      window.setTimeout(() => (moved = false), 0);
      window.setTimeout(() => {
        el.style.scrollSnapType = "";
        el.style.scrollBehavior = "";
      }, 260);
    };

    // Um arraste não pode virar clique no link do card
    const onClick = (e: MouseEvent) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    const onDragStart = (e: DragEvent) => e.preventDefault();

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("dragstart", onDragStart);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("dragstart", onDragStart);
    };
  }, [ref]);
}
