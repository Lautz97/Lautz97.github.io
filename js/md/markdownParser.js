const rules = [
    //header rules
    [/#{6}\s?([^\n]+)/g, "<h6>$1</h6>"],
    [/#{5}\s?([^\n]+)/g, "<h5>$1</h5>"],
    [/#{4}\s?([^\n]+)/g, "<h4>$1</h4>"],
    [/#{3}\s?([^\n]+)/g, "<h3>$1</h3>"],
    [/#{2}\s?([^\n]+)/g, "<h2>$1</h2>"],
    [/#{1}\s?([^\n]+)/g, "<span class='colorlink'>$1</span>"],

    //bold, italics and paragragh rules
    [/\*\*\s?([^\n]+)\*\*/g, "<b>$1</b>"],
    [/\*\s?([^\n]+)\*/g, "<i>$1</i>"],
    [/__([^_]+)__/g, "<b>$1</b>"],
    [/_([^_`]+)_/g, "<i>$1</i>"],
    [/([^\n]+\n?)/g, "<p>$1</p>"],

    //links [text](url)
    [
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" style="color:#2A5DB0;text-decoration: none;">$1</a>',
    ],

    //highlights `code`
    [
        /(`)(\s?[^\n,]+\s?)(`)/g,
        '<a style="background-color:grey;color:black;text-decoration: none;border-radius: 3px;padding:0 2px;">$2</a>',
    ],

    //Lists
    [/([^\n]+)(\+)([^\n]+)/g, "<ul><li>$3</li></ul>"],
    [/([^\n]+)(\*)([^\n]+)/g, "<ul><li>$3</li></ul>"],

    //Image
    [
        /!\[([^\]]+)\]\(([^)]+)\s"([^")]+)"\)/g,
        '<img src="$2" alt="$1" title="$3" />',
    ],
];
function bind(el) {
    let html = el;
    rules.forEach(([rule, template]) => {
        html = html.replace(rule, template)
    })
    html = html.replace();
    return html;
}
