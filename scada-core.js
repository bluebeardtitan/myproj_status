// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const makeSVG = (s) => 'data:image/svg+xml;utf8,' + encodeURIComponent(s);

const ICONS = {

    valveOn: makeSVG(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 76 76">
            <polygon points="32,4 8,56 14,62 32,50 50,62 56,56"
                fill="#2ecc71" stroke="#27ae60" stroke-width="2"/>
            <rect x="28" y="2" width="8" height="26" rx="3"
                fill="#ffffff" opacity="0.5"/>
            <circle cx="32" cy="32" r="6"
                fill="#ffffff" opacity="0.4"/>
        </svg>`),

    valveOff: makeSVG(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 76 76">
            <polygon points="32,4 8,56 14,62 32,50 50,62 56,56"
                fill="#e74c3c" stroke="#c0392b" stroke-width="2"/>
            <rect x="28" y="2" width="8" height="26" rx="3"
                fill="#ffffff" opacity="0.4"/>
            <line x1="20" y1="20" x2="44" y2="44"
                stroke="#ffffff" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
        </svg>`),

    zoneOn: makeSVG(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 76 76">
            <!-- tank body -->
            <rect x="4" y="20" width="56" height="38" rx="6"
                fill="#3498db" stroke="#2980b9" stroke-width="2"/>
            <!-- pipe inlet on top -->
            <rect x="20" y="8" width="24" height="16" rx="4"
                fill="#2980b9" stroke="#1a6fa3" stroke-width="2"/>
            <!-- water fill level line -->
            <rect x="8" y="34" width="48" height="5" rx="2"
                fill="#ffffff" opacity="0.25"/>
            <!-- water shine -->
            <rect x="8" y="26" width="20" height="4" rx="2"
                fill="#ffffff" opacity="0.3"/>
            <!-- indicator dot -->
            <circle cx="52" cy="26" r="5"
                fill="#2ecc71" stroke="#ffffff" stroke-width="1.5"/>
        </svg>`),

    zoneOff: makeSVG(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 76 76">
            <!-- tank body -->
            <rect x="4" y="20" width="56" height="38" rx="6"
                fill="#bdc3c7" stroke="#95a5a6" stroke-width="2"/>
            <!-- pipe inlet on top -->
            <rect x="20" y="8" width="24" height="16" rx="4"
                fill="#95a5a6" stroke="#7f8c8d" stroke-width="2"/>
            <!-- empty tank lines -->
            <rect x="8" y="34" width="48" height="3" rx="2"
                fill="#ffffff" opacity="0.2"/>
            <!-- indicator dot -->
            <circle cx="52" cy="26" r="5"
                fill="#e74c3c" stroke="#ffffff" stroke-width="1.5"/>
        </svg>`),

    pumpOn: makeSVG(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 76 76">
            <!-- body -->
            <circle cx="32" cy="32" r="26"
                fill="#8e44ad" stroke="#6c3483" stroke-width="2"/>
            <!-- impeller blades -->
            <ellipse cx="32" cy="18" rx="5" ry="10" fill="#ffffff" opacity="0.5" transform="rotate(0 32 32)"/>
            <ellipse cx="32" cy="18" rx="5" ry="10" fill="#ffffff" opacity="0.5" transform="rotate(60 32 32)"/>
            <ellipse cx="32" cy="18" rx="5" ry="10" fill="#ffffff" opacity="0.5" transform="rotate(120 32 32)"/>
            <!-- centre hub -->
            <circle cx="32" cy="32" r="7" fill="#6c3483"/>
            <!-- indicator -->
            <circle cx="48" cy="16" r="5"
                fill="#2ecc71" stroke="#ffffff" stroke-width="1.5"/>
        </svg>`),

    pumpOff: makeSVG(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 76 76">
            <circle cx="32" cy="32" r="26"
                fill="#95a5a6" stroke="#7f8c8d" stroke-width="2"/>
            <ellipse cx="32" cy="18" rx="5" ry="10" fill="#ffffff" opacity="0.3" transform="rotate(0 32 32)"/>
            <ellipse cx="32" cy="18" rx="5" ry="10" fill="#ffffff" opacity="0.3" transform="rotate(60 32 32)"/>
            <ellipse cx="32" cy="18" rx="5" ry="10" fill="#ffffff" opacity="0.3" transform="rotate(120 32 32)"/>
            <circle cx="32" cy="32" r="7" fill="#7f8c8d"/>
            <circle cx="48" cy="16" r="5"
                fill="#e74c3c" stroke="#ffffff" stroke-width="1.5"/>
        </svg>`)
};

// ─── CYTOSCAPE STYLE ──────────────────────────────────────────────────────────
const CY_STYLE = [
        {
            selector: 'node',
            style: {
                'label':                  'data(label)',
                'width':                  60,
                'height':                 60,
                'background-color':       '#ffffff',
                'background-opacity':     0,
                'background-image':       ICONS.valveOff,
                'background-fit':         'contain',
                'background-clip':        'none',
                'background-width':       '80%',        // ← slightly inset so strokes never touch edge
                'background-height':      '80%',
                'background-position-x':  '50%',        // ← centre horizontally
                'background-position-y':  '50%',        // ← centre vertically
                'font-size':              '11px',
                'font-weight':            'bold',
                'text-wrap':              'wrap',
                'text-max-width':         '120px',
                'text-valign':            'bottom',
                'text-margin-y':          8,
                'color':                  '#2c3e50',
                'border-width':           0              // ← make sure no border pushes image off-centre
            }
        },

    // ── Valves ──────────────────────────────────────────────────────────────
    { selector: 'node[type="valve"][state="ON"]',
      style: { 'background-image': ICONS.valveOn } },

    { selector: 'node[type="valve"][state="OFF"]',
      style: { 'background-image': ICONS.valveOff } },

    // ── Zones / Tanks ────────────────────────────────────────────────────────
    { selector: 'node[type="zone"]',
      style: { 'width': 70, 'height': 70 } },

    { selector: 'node[type="zone"][state="ON"]',
      style: { 'background-image': ICONS.zoneOn } },

    { selector: 'node[type="zone"][state="OFF"]',
      style: { 'background-image': ICONS.zoneOff } },

    // ── Pumps ────────────────────────────────────────────────────────────────
    { selector: 'node[type="pump"]',
      style: { 'width': 64, 'height': 64 } },

    { selector: 'node[type="pump"][state="ON"]',
      style: { 'background-image': ICONS.pumpOn } },

    { selector: 'node[type="pump"][state="OFF"]',
      style: { 'background-image': ICONS.pumpOff } },

    // ── Edges (pipes) ────────────────────────────────────────────────────────
    {
        selector: 'edge',
        style: {
            'width':                  4,
            'line-color':             '#3498db',
            'target-arrow-shape':     'triangle',
            'target-arrow-color':     '#3498db',
            'curve-style':            'bezier',
            'label':                  'data(label)',
            'font-size':              '9px',
            'edge-text-rotation':     'autorotate',
            'text-background-opacity': 1,
            'text-background-color':  '#f0f4f8',
            'text-background-padding': '3px',
            'text-border-opacity':    1,
            'text-border-color':      '#d0d7de',
            'text-border-width':      1
        }
    },
    {
        selector: 'edge[flow="active"]',
        style: {
            'line-color':         '#2ecc71',
            'target-arrow-color': '#2ecc71',
            'width':              5,
            'line-style':         'solid'
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