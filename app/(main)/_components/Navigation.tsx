import { ElementRef, useEffect, useRef, useState } from "react";
import { ChevronsLeft, MenuIcon } from "lucide-react";

// use this to collapse the sidebar manually when
// an item on the sidebar is clicked
import { usePathname } from "next/navigation";

// need this to handle the resize of the sidebar
// not using tailwindcss because it is hard!!!
import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";

const Navigation = () => {
  // media
  const isMobile = useMediaQuery("(max-width: 768px)");

  // hooks
  const pathname = usePathname();

  // refs
  const isResizingRef = useRef<boolean | null>(null);
  const sideBarRef = useRef<ElementRef<"aside">>(null);
  const navBarRef = useRef<ElementRef<"div">>(null);

  // states
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile); // if it is mobile the sidebar auto collapses

  // effects
  // THIS IS TO AUTO COLLAPSE THE SIDE BAR IN MOBILE
  useEffect(() => {
    if (isMobile) collapse();
    else resetWidth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);
  // THIS IS TO AUTO COLLAPSE THE SIDE BAR WHEN NAVIGATE TO NEW ROUTE
  useEffect(() => {
    if (isMobile) collapse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isMobile]);

  // methods
  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;

    // get the horizontal position of the cursor
    let newWidth = event.clientX;

    // limit the min and max width of the sidebar when drag to resize
    if (newWidth < 240) newWidth = 240;
    if (newWidth >= 480) newWidth = 480;

    if (sideBarRef.current && navBarRef.current) {
      sideBarRef.current.style.width = `${newWidth}px`;
      navBarRef.current.style.setProperty("left", `${newWidth}px`);
      navBarRef.current.style.setProperty(
        "width",
        `calc(100% - ${newWidth}px)`
      );
    }
  };
  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mouseover", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };
  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    // press down to start resizing
    document.addEventListener("mousemove", handleMouseMove);
    // release to stop resizing
    document.addEventListener("mouseup", handleMouseUp);
  };
  const resetWidth = () => {
    if (!sideBarRef.current || !navBarRef.current) return;
    setIsCollapsed(false);
    setIsResetting(true);

    // snap the side bar back to initial position
    sideBarRef.current.style.width = isMobile ? "100%" : "240px";
    navBarRef.current.style.setProperty(
      "width",
      isMobile ? "0" : "calc(100% - 240px)"
    );
    navBarRef.current.style.setProperty("left", isMobile ? "100%" : "240px");

    // why this?
    // notice below the transition with 300 ms when isResetting is true
    // this is to make sure that the animation is done before the
    // isResetting is set to true
    setTimeout(() => setIsResetting(false), 300);
  };
  const collapse = () => {
    if (!sideBarRef.current || !navBarRef.current) return;
    setIsCollapsed(true);
    setIsResetting(true);

    // adjust the width
    sideBarRef.current.style.width = "0";
    navBarRef.current.style.setProperty("width", "100%");
    navBarRef.current.style.setProperty("left", "0");
    setTimeout(() => setIsResetting(false), 300);
  };

  // render
  return (
    <>
      <aside
        ref={sideBarRef}
        className={cn(
          "group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "w-0"
        )}
      >
        {/* COLLAPSE BUTTON */}
        <div
          role="button"
          className={cn(
            "w-7 h-7 text-muted-foreground rounded-sm hover:bg-neutral-200/60 dark:hover:bg-neutral-600 absolute top-2 right-3 opacity-0 group-hover/sidebar:opacity-100 transition",
            isMobile && "opacity-100"
          )}
          onClick={collapse}
        >
          <ChevronsLeft className="w-7 h-7 text-primary/30 scale-y-110" />
        </div>

        {/* ACTION ITEMS */}
        <div>
          <p>Action Items</p>
        </div>

        {/* DOCUMENTS */}
        <div className="mt-4">
          <p>Documents</p>
        </div>

        {/* RESIZE INDICATOR */}
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:hover:opacity-100 transition cursor-ew-resize absolute h-full w-[2.5px] bg-primary/10 right-0 top-0"
        />
      </aside>

      {/* NAV BAR */}
      {/* 240px = left-60 */}
      <div
        ref={navBarRef}
        className={cn(
          "absolute top-0 z-[99999] left-60 w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
          isMobile && "left-0 w-full"
        )}
      >
        <nav className="bg-transparent px-3 py-2 w-full">
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role="button"
              className="w-6 h-6 text-muted-foreground"
            />
          )}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
