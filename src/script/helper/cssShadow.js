const css = {
    backgroundBody: "#101010",
    colorContainer: "#151515",
    colorNavbar: {
        default: "rgba(31, 31, 31, 0.3)",
        changed: "#202020",
        transparent: "rgba(0,0,0,0)"
    },
    endStyle: "</style>",
    endHtml: "<!--- ENDHTML --->",
    endMedia: `}`,
    html: "<!--- HTML --->",
    media: ({ screen }) => {
        switch (screen) {
            case "phone":
                screen = `max-width: 767px`;
                break;
            case "tablet":
                screen = `max-width: 1023px`;
                break
            
            case "desktop":
                screen = `min-width: 1024px`;
                break;
            
            default:
                screen = screen;
                break;
        } 
        return `@media only screen and (${screen}) {`;
    },
    sizeSearch: "35px",
    style: "<style>",
}

export { css };
