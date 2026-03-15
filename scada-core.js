// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const makeSVG = (s) => 'data:image/svg+xml;utf8,' + encodeURIComponent(s);

const ICONS = {
    valveOn:  makeSVG(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="32,4 8,56 14,60 32,48 50,60 56,56" fill="#2ecc71" stroke="#fff" stroke-width="2"/><rect x="29" y="4" width="6" height="24" rx="2" fill="#27ae60"/></svg>`),
    valveOff: makeSVG(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><polygon points="32,4 8,56 14,60 32,48 50,60 56,56" fill="#e74c3c" stroke="#fff" stroke-width="2"/><rect x="29" y="4" width="6" height="24" rx="2" fill="#c0392b"/></svg>`),
    zoneOn:   makeSVG(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="6" y="18" width="52" height="36" rx="5" fill="#3498db" stroke="#fff" stroke-width="2"/><rect x="22" y="8" width="20" height="14" rx="3" fill="#2980b9" stroke="#fff" stroke-width="2"/><rect x="10" y="28" width="44" height="4" rx="2" fill="rgba(255,255,255,0.3)"/></svg>`),
    zoneOff:  makeSVG(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect x="6" y="18" width="52" height="36" rx="5" fill="#95a5a6" stroke="#fff" stroke-width="2"/><rect x="22" y="8" width="20" height="14" rx="3" fill="#7f8c8d" stroke="#fff" stroke-width="2"/><rect x="10" y="28" width="44" height="4" rx="2" fill="rgba(255,255,255,0.2)"/></svg>`)
};

// ─── CYTOSCAPE STYLE ──────────────────────────────────────────────────────────
const CY_STYLE = [
    {
        selector: 'node',
        style: {
            'label': 'data(label)',
            'width': 54, 'height': 54,
            'background-opacity': 0,
            'background-image': ICONS.valveOff,
            'background-fit': 'contain',
            'font-size': '11px',
            'font-weight': 'bold',
            'text-wrap': 'wrap',
            'text-max-width': '110px',
            'text-valign': 'bottom',
            'text-margin-y': 6,
            'color': '#2c3e50'
        }
    },
    { selector: 'node[type="valve"][state="ON"]',  style: { 'background-image': ICONS.valveOn } },
    { selector: 'node[type="valve"][state="OFF"]', style: { 'background-image': ICONS.valveOff } },
    { selector: 'node[type="zone"][state="ON"]',   style: { 'background-image': ICONS.zoneOn,  'width': 64, 'height': 64 } },
    { selector: 'node[type="zone"][state="OFF"]',  style: { 'background-image': ICONS.zoneOff, 'width': 64, 'height': 64 } },
    {
        selector: 'edge',
        style: {
            'width': 4, 'line-color': '#3498db',
            'target-arrow-shape': 'triangle',
            'target-arrow-color': '#3498db',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': '9px',
            'edge-text-rotation': 'autorotate',
            'text-background-opacity': 1,
            'text-background-color': '#f0f4f8',
            'text-background-padding': '2px'
        }
    },
    {
        selector: 'edge[flow="active"]',
        style: { 'line-color': '#2ecc71', 'target-arrow-color': '#2ecc71', 'width': 5 }
    }
];

// ─── APPLY STATUS UPDATE FROM GIST ───────────────────────────────────────────
function applyStatus(cy, data) {
    let updated = 0;
    data.forEach(item => {
        const el = cy.getElementById(item.id);
        if (el.length === 0) return;
        if (item.state !== undefined) el.data('state', item.state.toString().toUpperCase());
        if (item.label !== undefined) el.data('label', item.label.toString());
        if (item.type  !== undefined) el.data('type',  item.type.toString().toLowerCase());
        if (item.flow  !== undefined) el.data('flow',  item.flow.toString().toLowerCase());
        updated++;
    });
    cy.style().update();
    return updated;
}