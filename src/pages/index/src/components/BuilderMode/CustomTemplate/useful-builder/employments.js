import {v4 as uuidv4} from "uuid"

export default {
    "id": uuidv4(),
    "name": "sheet",
    "droppable": true,
    "children": [{
        "id": "4814f11b-e6d2-4fcb-983f-37e99f62f5a8",
        "name": "paragraph",
        "styleConfig": {
            "margin": [0, 0, 0, 0],
            "padding": [0, 0, 0, 0],
            "borderTopWidth": 0,
            "borderRightWidth": 0,
            "borderBottomWidth": 0,
            "borderLeftWidth": 0,
            "borderColor": "#888",
            "borderTopLeftRadius": 4,
            "borderTopRightRadius": 4,
            "borderBottomRightRadius": 4,
            "borderBottomLeftRadius": 4,
            "borderStyle": "solid",
            "position": "static",
            "top": "auto",
            "left": "auto",
            "right": "auto",
            "bottom": "auto",
            "lineHeight": "inherit",
            "letterSpacing": "inherit",
            "textAlign": "inherit",
            "fontWeight": "inherit",
            "fontStyle": "inherit",
            "colorInherit": true,
            "fontSizeInherit": false,
            "backgroundInherit": true,
            "lineHeightInherit": true,
            "letterSpacingInherit": true,
            "textAlignInherit": true,
            "fontWeightInherit": true,
            "fontStyleInherit": true,
            "transform": null,
            "width": "100%",
            "height": "auto",
            "color": "inherit",
            "fontSize": 18,
            "background": "inherit",
            "col": 12
        },
        "config": {"value": "company name", "icon": false, "appendIcon": null, "prependIcon": null},
        "pin": false,
        "slot": "company"
    }, {
        "id": "6f3fe7d6-af22-47e8-ab82-3bab0eae2d7b",
        "name": "paragraph",
        "styleConfig": {
            "margin": [0, 0, 0, 0],
            "padding": [0, 0, 0, 0],
            "borderTopWidth": 0,
            "borderRightWidth": 0,
            "borderBottomWidth": 0,
            "borderLeftWidth": 0,
            "borderColor": "#888",
            "borderTopLeftRadius": 4,
            "borderTopRightRadius": 4,
            "borderBottomRightRadius": 4,
            "borderBottomLeftRadius": 4,
            "borderStyle": "solid",
            "position": "static",
            "top": "auto",
            "left": "auto",
            "right": "auto",
            "bottom": "auto",
            "lineHeight": "16",
            "letterSpacing": "inherit",
            "textAlign": "left",
            "fontWeight": "inherit",
            "fontStyle": "inherit",
            "colorInherit": false,
            "fontSizeInherit": false,
            "backgroundInherit": true,
            "lineHeightInherit": false,
            "letterSpacingInherit": true,
            "textAlignInherit": false,
            "fontWeightInherit": true,
            "fontStyleInherit": true,
            "transform": null,
            "width": "100%",
            "height": "auto",
            "color": "#5f5f5f",
            "fontSize": "14",
            "background": "inherit",
            "col": 6
        },
        "config": {"value": "job title", "icon": false, "appendIcon": null, "prependIcon": null},
        "pin": false,
        "slot": "jobPosition"
    }, {
        "id": "b0fdb5c2-2e5a-42c6-9eeb-64995975f877",
        "name": "paragraph",
        "styleConfig": {
            "margin": [0, 0, 0, "2"],
            "padding": [0, 0, 0, 0],
            "borderTopWidth": 0,
            "borderRightWidth": 0,
            "borderBottomWidth": 0,
            "borderLeftWidth": 0,
            "borderColor": "#888",
            "borderTopLeftRadius": 4,
            "borderTopRightRadius": 4,
            "borderBottomRightRadius": 4,
            "borderBottomLeftRadius": 4,
            "borderStyle": "solid",
            "position": "static",
            "top": "auto",
            "left": "auto",
            "right": "auto",
            "bottom": "auto",
            "lineHeight": "16",
            "letterSpacing": "inherit",
            "textAlign": "right",
            "fontWeight": "inherit",
            "fontStyle": "inherit",
            "colorInherit": false,
            "fontSizeInherit": false,
            "backgroundInherit": true,
            "lineHeightInherit": false,
            "letterSpacingInherit": true,
            "textAlignInherit": false,
            "fontWeightInherit": true,
            "fontStyleInherit": true,
            "transform": null,
            "width": "100%",
            "height": "auto",
            "color": "#848484",
            "fontSize": "13",
            "background": "inherit",
            "col": 6
        },
        "config": {"value": "2019-06-12 - 2020-03-06", "icon": false, "appendIcon": null, "prependIcon": null},
        "pin": false,
        "slot": "period"
    }, {
        "id": "22e3b577-0958-43fa-b2ca-60d89e87163d",
        "name": "list",
        "styleConfig": {
            "margin": [0, 0, 0, 0],
            "padding": [0, 0, 0, "24"],
            "borderTopWidth": 0,
            "borderRightWidth": 0,
            "borderBottomWidth": 0,
            "borderLeftWidth": 0,
            "borderColor": "#888888FF",
            "borderTopLeftRadius": 4,
            "borderTopRightRadius": 4,
            "borderBottomRightRadius": 4,
            "borderBottomLeftRadius": 4,
            "borderStyle": "solid",
            "position": "static",
            "top": "auto",
            "left": "auto",
            "right": "auto",
            "bottom": "auto",
            "lineHeight": "18",
            "letterSpacing": "inherit",
            "textAlign": "inherit",
            "fontWeight": "inherit",
            "fontStyle": "inherit",
            "colorInherit": true,
            "fontSizeInherit": false,
            "backgroundInherit": true,
            "lineHeightInherit": false,
            "letterSpacingInherit": true,
            "textAlignInherit": true,
            "fontWeightInherit": true,
            "fontStyleInherit": true,
            "transform": null,
            "width": "100%",
            "height": "auto",
            "color": "#242424",
            "fontSize": "13",
            "background": "inherit",
            "col": 12
        },
        "config": {
            "value": ["Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ."],
            "listStyle": "disc",
            "dense": true
        },
        "pin": false,
        "slot": "description"
    }],
    "styleConfig": {
        "margin": [0, 0, "10", 0],
        "padding": [0, 0, 0, 0],
        "borderTopWidth": 0,
        "borderRightWidth": 0,
        "borderBottomWidth": 0,
        "borderLeftWidth": 0,
        "borderColor": "#888",
        "borderTopLeftRadius": 4,
        "borderTopRightRadius": 4,
        "borderBottomRightRadius": 4,
        "borderBottomLeftRadius": 4,
        "borderStyle": "solid",
        "position": "static",
        "top": "auto",
        "left": "auto",
        "right": "auto",
        "bottom": "auto",
        "lineHeight": "Inherit",
        "letterSpacing": "Inherit",
        "textAlign": "inherit",
        "fontWeight": "Inherit",
        "fontStyle": "Inherit",
        "colorInherit": true,
        "fontSizeInherit": true,
        "backgroundInherit": true,
        "lineHeightInherit": true,
        "letterSpacingInherit": true,
        "textAlignInherit": true,
        "fontWeightInherit": true,
        "fontStyleInherit": true,
        "transform": null,
        "width": "100%",
        "height": "auto",
        "color": "Inherit",
        "fontSize": "Inherit",
        "background": "Inherit",
        "col": 12
    },
    "config": {},
    "pin": false,
    "slot": "employments",
    "index": 0
}