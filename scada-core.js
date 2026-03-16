// ─── SVG ICONS — simple originals that work ───────────────────────────────────

const svgValveOn  = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232ecc71"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>');
const svgValveOff = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23e74c3c"><path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z"/></svg>');

const svgZoneOn   = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%233498db"><path d="M3 13h2v7H3v-7zm4-4h2v11H7V9zm4-4h2v15h-2V5zm4 2h2v13h-2V7zm4-4h2v17h-2V3z"/></svg>');
const svgZoneOff  = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2395a5a6"><path d="M3 13h2v7H3v-7zm4-4h2v11H7V9zm4-4h2v15h-2V5zm4 2h2v13h-2V7zm4-4h2v17h-2V3z"/></svg>');

const svgPumpOn   = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%238e44ad"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>');
const svgPumpOff  = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%2395a5a6"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>');

// ─── CYTOSCAPE STYLE ──────────────────────────────────────────────────────────
const CY_STYLE = [
    {
        selector: 'node',
        style: {
            'label':              'data(label)',
            'width':              50,
            'height':             50,
            'background-opacity': 0,
            'background-image':   svgValveOff,
            'background-fit':     'contain',
            'font-size':          '10px',
            'font-weight':        'bold',
            'text-wrap':          'wrap',
            'text-max-width':     '100px',
            'text-valign':        'bottom',
            'text-halign':        'center',
            'text-margin-y':      5,
            'color':              '#2c3e50',
            'border-width':       0
        }
    },

    // ── Valve ─────────────────────────────────────────────────────────────────
    { selector: 'node[type="valve"][state="ON"]',
      style: { 'background-image': svgValveOn } },

    { selector: 'node[type="valve"][state="OFF"]',
      style: { 'background-image': svgValveOff } },

    // ── Zone / Tank ───────────────────────────────────────────────────────────
    { selector: 'node[type="zone"]',
      style: { 'width': 60, 'height': 60 } },

    { selector: 'node[type="zone"][state="ON"]',
      style: { 'background-image': svgZoneOn } },

    { selector: 'node[type="zone"][state="OFF"]',
      style: { 'background-image': svgZoneOff } },

    // ── Pump ──────────────────────────────────────────────────────────────────
    { selector: 'node[type="pump"]',
      style: { 'width': 55, 'height': 55 } },

    { selector: 'node[type="pump"][state="ON"]',
      style: { 'background-image': svgPumpOn } },

    { selector: 'node[type="pump"][state="OFF"]',
      style: { 'background-image': svgPumpOff } },

    // ── Edges / Pipes ─────────────────────────────────────────────────────────
    {
        selector: 'edge',
        style: {
            'width':                    4,
            'line-color':               '#3498db',
            'target-arrow-shape':       'triangle',
            'target-arrow-color':       '#3498db',
            'curve-style':              'bezier',
            'label':                    'data(label)',
            'font-size':                '9px',
            'edge-text-rotation':       'autorotate',
            'text-background-opacity':  1,
            'text-background-color':    '#f0f4f8',
            'text-background-padding':  '3px',
            'text-border-opacity':      1,
            'text-border-color':        '#d0d7de',
            'text-border-width':        1
        }
    },
    {
        selector: 'edge[flow="active"]',
        style: {
            'line-color':         '#2ecc71',
            'target-arrow-color': '#2ecc71',
            'width':              5
        }
    },
    {
        selector: 'edge[flow="fault"]',
        style: {
            'line-color':         '#e74c3c',
            'target-arrow-color': '#e74c3c',
            'width':              4,
            'line-style':         'dashed'
        }
    }
];

// ─── NO-OP — keeps index.html call intact ────────────────────────────────────
function initNodeLabels(cy) { /* not needed */ }

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