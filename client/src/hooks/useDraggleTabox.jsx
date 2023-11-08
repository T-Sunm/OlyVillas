import { useEffect, useRef, useState } from "react";

const useDragScroll = () => {
    const elementRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    
    const dragging = (e) => {
        if (!isDragging) return;  // Thêm điều kiện kiểm tra ở đây
        elementRef.current.classList.add("scroll-auto")
        elementRef.current.classList.add("select-none")
        elementRef.current.scrollLeft -= e.movementX;   
    };

    const handleMouseDown = () => {
        setIsDragging(true);
        elementRef.current.addEventListener("mousemove", dragging);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        elementRef.current.removeEventListener("mousemove", dragging); // Khi thả chuột, loại bỏ sự kiện di chuyển chuột
        elementRef.current.classList.remove("scroll-auto")
    };

    useEffect(() => {
        const tabsBox = elementRef.current;

        if (tabsBox) {
            tabsBox.addEventListener("mousedown", handleMouseDown);
            tabsBox.addEventListener("mouseup", handleMouseUp);
            // Thêm sự kiện mouseleave để ngừng kéo khi chuột di chuyển ra ngoài
            tabsBox.addEventListener("mouseleave", handleMouseUp);
        }

        // Cleanup
        return () => {
            if (tabsBox) {
                tabsBox.removeEventListener("mousedown", handleMouseDown);
                tabsBox.removeEventListener("mouseup", handleMouseUp);
                tabsBox.removeEventListener("mouseleave", handleMouseUp); 
                tabsBox.removeEventListener("mousemove", dragging); // Trường hợp an toàn, loại bỏ nếu có
            }
        };
    }, [isDragging]); 

    return elementRef;
}

export default useDragScroll;