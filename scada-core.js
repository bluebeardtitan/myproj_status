// ─── SVG ICONS ────────────────────────────────────────────────────────────────
// All SVGs use padded viewBox so Cytoscape never clips edges

const makeSVG = (s) => 'data:image/svg+xml;utf8,' + encodeURIComponent(s);

const ICONS = {

    valveOn: makeSVG(`<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="-10 -10 120 120"
        preserveAspectRatio="xMidYMid meet">
        <polygon points="50,10 15,85 25,92 50,78 75,92 85,85"
            fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
        <rect x="45" y="8" width="10" height="28" rx="3"
            fill="#ffffff" opacity="0.5"/>
        <circle cx="50" cy="50" r="8"
            fill="#ffffff" opacity="0.35"/>
    </svg>`),

    valveOff: makeSVG(`<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="-10 -10 120 120"
        preserveAspectRatio="xMidYMid meet">
        <polygon points="50,10 15,85 25,92 50,78 75,92 85,85"
            fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>
        <rect x="45" y="8" width="10" height="28" rx="3"
            fill="#ffffff" opacity="0.4"/>
        <line x1="30" y1="32" x2="68" y2="68"
            stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
    </svg>`),

    zoneOn: makeSVG(`<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="-10 -10 120 120"
        preserveAspectRatio="xMidYMid meet">
        <rect x="10" y="35" width="80" height="54" rx="7"
            fill="#3498db" stroke="#2980b9" stroke-width="2"/>
        <rect x="34" y="14" width="32" height="26" rx="5"
            fill="#2980b9" stroke="#1a6fa3" stroke-width="2"/>
        <rect x="16" y="52" width="68" height="7" rx="3"
            fill="#ffffff" opacity="0.22"/>
        <rect x="16" y="42" width="30" height="5" rx="2"
            fill="#ffffff" opacity="0.28"/>
        <circle cx="76" cy="42" r="7"
            fill="#2ecc71" stroke="#ffffff" stroke-width="2"/>
    </svg>`),

    zoneOff: makeSVG(`<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="-10 -10 120 120"
        preserveAspectRatio="xMidYMid meet">
        <rect x="10" y="35" width="80" height="54" rx="7"
            fill="#bdc3c7" stroke="#95a5a6" stroke-width="2"/>
        <rect x="34" y="14" width="32" height="26" rx="5"
            fill="#95a5a6" stroke="#7f8c8d" stroke-width="2"/>
        <rect x="16" y="52" width="68" height="7" rx="3"
            fill="#ffffff" opacity="0.15"/>
        <circle cx="76" cy="42" r="7"
            fill="#e74c3c" stroke="#ffffff" stroke-width="2"/>
    </svg>`),

    pumpOn: makeSVG(`<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="-10 -10 120 120"
        preserveAspectRatio="xMidYMid meet">
        <circle cx="50" cy="50" r="38"
            fill="#8e44ad" stroke="#6c3483" stroke-width="2"/>
        <ellipse cx="50" cy="28" rx="7" ry="14"
            fill="#ffffff" opacity="0.45" transform="rotate(0 50 50)"/>
        <ellipse cx="50" cy="28" rx="7" ry="14"
            fill="#ffffff" opacity="0.45" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="28" rx="7" ry="14"
            fill="#ffffff" opacity="0.45" transform="rotate(120 50 50)"/>
        <circle cx="50" cy="50" r="10"
            fill="#6c3483"/>
        <circle cx="72" cy="28" r="7"
            fill="#2ecc71" stroke="#ffffff" stroke-width="2"/>
    </svg>`),

    pumpOff: makeSVG(`<svg xmlns="http://www.w3.org/2000/svg"
        viewBox="-10 -10 120 120"
        preserveAspectRatio="xMidYMid meet">
        <circle cx="50" cy="50" r="38"
            fill="#95a5a6" stroke="#7f8c8d" stroke-width="2"/>
        <ellipse cx="50" cy="28" rx="7" ry="14"
            fill="#ffffff" opacity="0.25" transform="rotate(0 50 50)"/>
        <ellipse cx="50" cy="28" rx="7" ry="14"
            fill="#ffffff" opacity="0.25" transform="rotate(60 50 50)"/>
        <ellipse cx="50" cy="28" rx="7" ry="14"
            fill="#ffffff" opacity="0.25" transform="rotate(120 50 50)"/>
        <circle cx="50" cy="50" r="10"
            fill="#7f8c8d"/>
        <circle cx="72" cy="28" r="7"
            fill="#e74c3c" stroke="#ffffff" stroke-width="2"/>
    </svg>`)
};

// ─── CYTOSCAPE STYLE ──────────────────────────────────────────────────────────
const CY_STYLE = [
{
selector: 'node',
style: {
    'label': 'data(label)',

    'width': 200,
    'height': 200,

    'background-opacity': 0,
    'background-image': ICONS.valveOff,

    'background-fit': 'contain',
    'background-width': '90%',
    'background-height': '90%',

    'background-position-x': '50%',
    'background-position-y': '50%',

    'background-clip': 'none',

    'font-size': '11px',
    'font-weight': 'bold',

    'text-wrap': 'wrap',
    'text-max-width': '120px',

    'text-valign': 'bottom',
    'text-margin-y': 14,

    'color': '#2c3e50',

    'min-zoomed-font-size': 8,

    'border-width': 0
}
},

// ── Valves ─────────────────────────────────────────────
{
selector: 'node[type="valve"][state="ON"]',
style: { 'background-image': ICONS.valveOn }
},

{
selector: 'node[type="valve"][state="OFF"]',
style: { 'background-image': ICONS.valveOff }
},

// ── Zones ──────────────────────────────────────────────
{
selector: 'node[type="zone"]',
style: {
    'width': 70,
    'height': 70
}
},

{
selector: 'node[type="zone"][state="ON"]',
style: { 'background-image': ICONS.zoneOn }
},

{
selector: 'node[type="zone"][state="OFF"]',
style: { 'background-image': ICONS.zoneOff }
},

// ── Pumps ──────────────────────────────────────────────
{
selector: 'node[type="pump"]',
style: {
    'width': 65,
    'height': 65
}
},

{
selector: 'node[type="pump"][state="ON"]',
style: { 'background-image': ICONS.pumpOn }
},

{
selector: 'node[type="pump"][state="OFF"]',
style: { 'background-image': ICONS.pumpOff }
},

// ── Pipes / Edges ──────────────────────────────────────
{
selector: 'edge',
style: {
    'width': 4,
    'line-color': '#3498db',

    'target-arrow-shape': 'triangle',
    'target-arrow-color': '#3498db',

    'curve-style': 'bezier',

    'label': 'data(label)',
    'font-size': '9px',

    'edge-text-rotation': 'autorotate',

    'text-background-opacity': 1,
    'text-background-color': '#f0f4f8',
    'text-background-padding': '3px',

    'text-border-opacity': 1,
    'text-border-color': '#d0d7de',
    'text-border-width': 1
}
},

{
selector: 'edge[flow="active"]',
style: {
    'line-color': '#2ecc71',
    'target-arrow-color': '#2ecc71',
    'width': 5
}
},

{
selector: 'edge[flow="fault"]',
style: {
    'line-color': '#e74c3c',
    'target-arrow-color': '#e74c3c',
    'width': 4,
    'line-style': 'dashed'
}
}
];

// ─── APPLY STATUS UPDATE FROM DATA ───────────────────────────────────────────
function applyStatus(cy, data) {

let updated = 0;

data.forEach(item => {

    const el = cy.getElementById(item.id);
    if (el.length === 0) return;

    if (item.state !== undefined)
        el.data('state', item.state.toString().toUpperCase());

    if (item.label !== undefined)
        el.data('label', item.label.toString());

    if (item.type !== undefined)
        el.data('type', item.type.toString().toLowerCase());

    if (item.flow !== undefined)
        el.data('flow', item.flow.toString().toLowerCase());

    updated++;
});

cy.style().update();

return updated;
}