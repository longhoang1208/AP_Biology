
const L=["SI#QE","#III#","#Q###"];
const Z=[
    {
        n:"1 · Enter the chloroplast",
        i:[
            "Welcome, CO₂! You are a carbon dioxide molecule that just entered a leaf through a stoma. Next stop: the chloroplast.",
            "A chloroplast has two membranes. Inside are stacks of thylakoids (grana) floating in a fluid called the stroma.",
            "The light reactions happen in the thylakoid membranes. They produce ATP and NADPH.",
            "The Calvin cycle happens in the stroma. It uses ATP and NADPH to build sugar from CO₂."
        ],
        q:[
            [
                "Where in the chloroplast does the Calvin cycle take place?",
                [
                    "Thylakoid membrane",
                    "Stroma",
                    "Outer membrane",
                    "Intermembrane space"
                ],
                1,
                "The enzymes of the Calvin cycle are dissolved in the stroma."
            ],
            [
                "Which molecules do the light reactions supply to the Calvin cycle?",["ATP and NADPH","O₂ and glucose","CO₂ and H₂O","ADP and NADP⁺"],0,"ATP provides energy and NADPH provides high-energy electrons."
            ]
        ]
    },
    {
        n:"2 · Carbon fixation",
        i:[
            "Stage 1: Carbon fixation. CO₂ is attached to an organic molecule so its carbon can become part of a sugar.",
            "The CO₂ acceptor is RuBP (ribulose-1,5-bisphosphate), a 5-carbon sugar.",
            "The enzyme Rubisco catalyzes this reaction. It is probably the most abundant enzyme on Earth.",
            "The 6-carbon product is unstable and splits at once into two molecules of 3-PGA (3-phosphoglycerate), 3 carbons each."
        ],
        q:[
            [
                "What is the CO₂ acceptor in the Calvin cycle?",
                [
                    "RuBP",
                    "G3P",
                    "3-PGA",
                    "NADPH"
                ],
                0,
                "RuBP (5 carbons) combines with CO₂."
            ],
            [
                "Which enzyme fixes CO₂ onto RuBP?",
                [
                    "ATP synthase",
                    "Rubisco",
                    "Catalase",
                    "Amylase"
                ],
                1,
                "Rubisco = RuBP carboxylase/oxygenase."
            ]
        ]
    },
    {
        n:"3 · Reduction",
        i:[
            "Stage 2: Reduction. Each 3-PGA receives a phosphate from ATP, forming 1,3-bisphosphoglycerate.",
            "NADPH then donates electrons, reducing it to G3P (glyceraldehyde-3-phosphate), a 3-carbon sugar. NADPH becomes NADP⁺.",
            "For every 3 CO₂ fixed, 6 G3P are made, using 6 ATP and 6 NADPH.",
            "Only 1 of those 6 G3P is the net gain. It leaves the cycle to make glucose and other carbohydrates; the other 5 stay in the cycle."
        ],
        q:[
            [
                "What is the role of NADPH in the reduction stage?",["It donates electrons","It fixes CO₂","It splits water","It makes ATP"],0,"Reduction means gaining electrons, and NADPH is the electron donor."
            ],
            [
                "From 3 CO₂, 6 G3P are made. How many leave the cycle as net product?",["6","3","1","5"],2,"Only 1 G3P exits; the other 5 are recycled into RuBP."
            ]
        ]
    },
    {
        n:"4 · Regeneration",
        i:[
            "Stage 3: Regeneration. The cycle must rebuild RuBP, or it cannot fix any more CO₂.",
            "Five G3P (5 × 3 = 15 carbons) are rearranged into three RuBP (3 × 5 = 15 carbons).",
            "This rearrangement uses 3 ATP. NADPH is not needed in this stage.",
            "RuBP is back! The cycle is ready to accept new CO₂ molecules."
        ],
        q:[
            [
                "What is regenerated in the last stage of the cycle?",["RuBP","CO₂","NADPH","Glucose"],0,"Regenerating RuBP keeps the cycle going."
            ],
            [
                "How many ATP are used to regenerate 3 RuBP?",["1","3","6","9"],1,"Regeneration uses 3 ATP (per 3 CO₂ fixed)."
            ]
        ]
    },
    {
        n:"5 · Final destination",
        i:[
            "Final destination! One turn of the cycle fixes just 1 CO₂, so three turns (3 CO₂) are needed for 1 net G3P.",
            "Total for 3 CO₂: 9 ATP and 6 NADPH → 1 net G3P.",
            "Two G3P can combine into one glucose (C₆H₁₂O₆), so 6 CO₂ are fixed per glucose.",
            "G3P is also used to build sucrose, starch, cellulose, fats and amino acids. Plants feed the whole food chain!"
        ],
        q:[
            [
                "How much ATP and NADPH are needed to make 1 net G3P?",["3 ATP, 3 NADPH","9 ATP, 6 NADPH","6 ATP, 9 NADPH","18 ATP, 12 NADPH"],1,"3 CO₂ → 9 ATP + 6 NADPH → 1 G3P."
            ],
            [
                "How many CO₂ must be fixed to build one glucose?",["3","6","9","12"],1,"1 glucose = 2 G3P = 6 CO₂ fixed."
            ]
        ]
    }
];

const $=i=>document.getElementById(i);
let z,x,y,T,done,score,tries;

function open(h){
    $('mb').innerHTML=h;
    $('ov').hidden=false;
    const b=$('mb').querySelector('.btn');
    if(b)b.focus();
}

function shut(){
    $('ov').hidden=true;
    draw()
}

function load(){
    let a=0, b=0;
    done=new Set();
    T=L.map(
        (r,j)=>[...r].map(
            (c,i)=>{
                if(c=='S'){
                    x=i;
                    y=j
                }return{c,i,j,k:c=='I'?a++:c=='Q'?b++:0}
            }
        )
    );
    draw();
}

function cnt(){
    const f=ch=>T.flat().filter(t=>t.c==ch);
    return[f('I').filter(t=>done.has(t.i+','+t.j)).length,f('I').length,f('Q').filter(t=>done.has(t.i+','+t.j)).length,f('Q').length]
}

function draw(){
    const[a,b,c,d]=cnt(), all = a == b && c == d;
    $('zt').textContent=Z[z].n;$('sc').textContent='⭐ '+score;
    document.documentElement.style.setProperty(
        '--zc',
        [
            '#2ecc71',
            '#f1c40f',
            '#e67e22',
            '#9b59b6',
            '#3498db'
        ][z]
    );
    $('steps').innerHTML=Z.map((q,i)=>`<span class="${i==z?'on':i<z?'ok':''}">${q.n.slice(4)}</span>`).join('');
    $('hud').textContent=`💡 ${a}/${b}   ❓ ${c}/${d}`+(all?'   🚪 Exit unlocked!':'');
    $('board').innerHTML=T.flat().map(
        t=>{
            const dn=done.has(t.i+','+t.j);
            const ic={I:'💡',Q:'❓',E:all?'🚪':'🔒',S:'🌱'}[t.c]||'';
            return`<div class="t ${t.c=='#'?'w':t.c} ${dn?'d':''}" data-i="${t.i}" data-j="${t.j}">${x==t.i&&y==t.j?'<div class="me">CO₂</div>':ic}</div>`
        }
    ).join('')
}

function mv(dx,dy){
    if(!$('ov').hidden)return;
    const nx=x+dx,ny=y+dy;
    if(!T[ny]||!T[ny][nx]||T[ny][nx].c=='#')return;
    x=nx;
    y=ny;
    draw();
    step(T[y][x])
}

function step(t){
    const k=t.i+','+t.j,d=Z[z];
    if(t.c=='I'&&!done.has(k)){
        done.add(k);
        draw();
        open(`<h3>💡 Theory</h3><p>${d.i[t.k]}</p><button class="btn" onclick="shut()">Got it!</button>`)
    }else if(t.c=='Q'&&!done.has(k)){
        ask(t,k);
    }else if(t.c=='E'){
        const[a,b,c,e]=cnt();
        if(a<b||c<e){
            open(`<h3>🔒 Door locked</h3><p>Collect every 💡 and answer every ❓ in this section first.</p><button class="btn" onclick="shut()">OK</button>`);
        }else if(z==4){
            end();
        }else{
            open(`<div class="big">🎉</div><h3>Section complete!</h3><p>Next: <b>${Z[z+1].n.slice(4)}</b></p><button class="btn" onclick="z++;shut();load()">Continue ➜</button>`)
        }
    }
}

function ask(t,k){
    const q=Z[z].q[t.k];
    tries=0;open(`<h3>❓ Quiz</h3><p>${q[0]}</p><div id="o"></div><p id="fb"></p>`);
    q[1].forEach((o,n)=>{
        const b=document.createElement('button');
        b.className='opt';
        b.textContent=o;b.onclick=()=>{
            if(n==q[2]){
                b.classList.add('ok');
                done.add(k);
                score+=tries?5:10;
                $('sc').textContent='⭐ '+score;
                $('o').querySelectorAll('button').forEach(s=>s.disabled=true);
                $('fb').innerHTML=`✅ <b>Correct!</b> ${q[3]}<br><button class="btn" onclick="shut()">Continue</button>`;
                $('fb').querySelector('.btn').focus()
            }else{
                tries++;
                b.classList.add('bad');
                b.disabled=true;
                $('fb').textContent='❌ Not quite, try another answer.'
            }
        };
        $('o').appendChild(b)
    })
}

function end(){
    const r=score>=90?'🏆 Calvin Cycle Master':score>=60?'🥈 Great Biologist':'🥉 Keep Practicing';
    open(`<div class="big">🍬</div><h3>You became sugar!</h3><p>Three CO₂ + 9 ATP + 6 NADPH → <b>1 G3P</b>, ready to build glucose.</p><p>Score: <b>${score}/100</b><br>${r}</p><button class="btn" onclick="begin()">Play again</button>`)
}

function begin(){
    z=0;
    score=0;
    load();
    $('ov').hidden=true;
    draw()
}

document.addEventListener('keydown',e=>{
    const m={ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1],ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0]}[e.key];
    if(m){
        e.preventDefault();mv(...m)
    }
});

document.querySelectorAll('#dp button').forEach(b=>b.onclick=()=>mv(...b.dataset.d.split(',').map(Number)));
$('board').onclick=e=>{
    const t=e.target.closest('.t');
    if(!t)return;
    const dx=+t.dataset.i-x,dy=+t.dataset.j-y;
    if(Math.abs(dx)+Math.abs(dy)==1)mv(dx,dy);
    else if(!dx&&!dy)step(T[y][x])
};
z=0;score=0;
load();
open(`<div class="big">🌿</div><h3>Calvin Cycle Quest</h3><p>You are a CO₂ molecule. Travel through the chloroplast, collect theory 💡, answer quizzes ❓ and turn into sugar! 5 sections, 10 questions.</p><button class="btn" onclick="shut()">▶ Start</button>`);
