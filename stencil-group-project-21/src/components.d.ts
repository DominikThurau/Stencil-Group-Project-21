/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CalendarEntry } from "./utils/calendar-entry";
export namespace Components {
    interface T2Calendar {
        "dayNames": string[];
        "monthNames": string[];
        "showFillDays": boolean;
    }
    interface T2Canvas {
    }
    interface T2Footer {
    }
    interface T2Random {
    }
    interface T2Start {
        "weatherData": any;
    }
    interface T2Todo {
    }
}
declare global {
    interface HTMLT2CalendarElement extends Components.T2Calendar, HTMLStencilElement {
    }
    var HTMLT2CalendarElement: {
        prototype: HTMLT2CalendarElement;
        new (): HTMLT2CalendarElement;
    };
    interface HTMLT2CanvasElement extends Components.T2Canvas, HTMLStencilElement {
    }
    var HTMLT2CanvasElement: {
        prototype: HTMLT2CanvasElement;
        new (): HTMLT2CanvasElement;
    };
    interface HTMLT2FooterElement extends Components.T2Footer, HTMLStencilElement {
    }
    var HTMLT2FooterElement: {
        prototype: HTMLT2FooterElement;
        new (): HTMLT2FooterElement;
    };
    interface HTMLT2RandomElement extends Components.T2Random, HTMLStencilElement {
    }
    var HTMLT2RandomElement: {
        prototype: HTMLT2RandomElement;
        new (): HTMLT2RandomElement;
    };
    interface HTMLT2StartElement extends Components.T2Start, HTMLStencilElement {
    }
    var HTMLT2StartElement: {
        prototype: HTMLT2StartElement;
        new (): HTMLT2StartElement;
    };
    interface HTMLT2TodoElement extends Components.T2Todo, HTMLStencilElement {
    }
    var HTMLT2TodoElement: {
        prototype: HTMLT2TodoElement;
        new (): HTMLT2TodoElement;
    };
    interface HTMLElementTagNameMap {
        "t2-calendar": HTMLT2CalendarElement;
        "t2-canvas": HTMLT2CanvasElement;
        "t2-footer": HTMLT2FooterElement;
        "t2-random": HTMLT2RandomElement;
        "t2-start": HTMLT2StartElement;
        "t2-todo": HTMLT2TodoElement;
    }
}
declare namespace LocalJSX {
    interface T2Calendar {
        "dayNames"?: string[];
        "monthNames"?: string[];
        "onDayChanged"?: (event: CustomEvent<CalendarEntry>) => void;
        "onMonthChanged"?: (event: CustomEvent<CalendarEntry>) => void;
        "showFillDays"?: boolean;
    }
    interface T2Canvas {
    }
    interface T2Footer {
    }
    interface T2Random {
    }
    interface T2Start {
        "weatherData"?: any;
    }
    interface T2Todo {
    }
    interface IntrinsicElements {
        "t2-calendar": T2Calendar;
        "t2-canvas": T2Canvas;
        "t2-footer": T2Footer;
        "t2-random": T2Random;
        "t2-start": T2Start;
        "t2-todo": T2Todo;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "t2-calendar": LocalJSX.T2Calendar & JSXBase.HTMLAttributes<HTMLT2CalendarElement>;
            "t2-canvas": LocalJSX.T2Canvas & JSXBase.HTMLAttributes<HTMLT2CanvasElement>;
            "t2-footer": LocalJSX.T2Footer & JSXBase.HTMLAttributes<HTMLT2FooterElement>;
            "t2-random": LocalJSX.T2Random & JSXBase.HTMLAttributes<HTMLT2RandomElement>;
            "t2-start": LocalJSX.T2Start & JSXBase.HTMLAttributes<HTMLT2StartElement>;
            "t2-todo": LocalJSX.T2Todo & JSXBase.HTMLAttributes<HTMLT2TodoElement>;
        }
    }
}
