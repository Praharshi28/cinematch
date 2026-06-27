import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

// ═══════════════════════════════════════════════════════════
//  DATASET
// ═══════════════════════════════════════════════════════════
const INITIAL_MOVIES = [
  { id:1,  name:"Inception",                  category:"Sci-Fi",   description:"A thief who steals secrets through dream-sharing technology is given a task to plant an idea into a mind.",          cast:["Leonardo DiCaprio","Joseph Gordon-Levitt","Elliot Page","Tom Hardy","Ken Watanabe"],             ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=YoHD9XEInc0" },
  { id:2,  name:"Interstellar",               category:"Sci-Fi",   description:"Astronauts travel through a wormhole in space to ensure humanity's survival on another planet.",                    cast:["Matthew McConaughey","Anne Hathaway","Jessica Chastain","Michael Caine","Matt Damon"],           ott:["Prime Video","Hotstar"],        trailer:"https://www.youtube.com/watch?v=zSWdZVtXT7E" },
  { id:3,  name:"The Matrix",                 category:"Sci-Fi",   description:"A hacker learns reality is a simulation and joins a rebellion against the machine controllers.",                    cast:["Keanu Reeves","Laurence Fishburne","Carrie-Anne Moss","Hugo Weaving"],                          ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=vKQi3bBA1y8" },
  { id:4,  name:"Arrival",                    category:"Sci-Fi",   description:"A linguist is recruited to communicate with aliens after mysterious spacecraft appear around the world.",           cast:["Amy Adams","Jeremy Renner","Forest Whitaker","Michael Stuhlbarg"],                               ott:["Prime Video","Hotstar"],        trailer:"https://www.youtube.com/watch?v=tFMo3UJ4B4g" },
  { id:5,  name:"Dune",                       category:"Sci-Fi",   description:"A young heir is thrust into a galactic war over a desert planet that controls the universe's most valuable spice.", cast:["Timothee Chalamet","Rebecca Ferguson","Oscar Isaac","Josh Brolin","Zendaya"],                    ott:["Prime Video","JioCinema"],      trailer:"https://www.youtube.com/watch?v=8g18jFHCLXk" },
  { id:6,  name:"The Dark Knight",            category:"Action",   description:"Batman fights the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy and chaos.",           cast:["Christian Bale","Heath Ledger","Aaron Eckhart","Gary Oldman","Maggie Gyllenhaal"],               ott:["Prime Video","Hotstar"],        trailer:"https://www.youtube.com/watch?v=EXeTwQWrcwY" },
  { id:7,  name:"Mad Max: Fury Road",         category:"Action",   description:"In a post-apocalyptic wasteland a woman rebels against a tyrannical ruler and escapes across the desert.",         cast:["Tom Hardy","Charlize Theron","Nicholas Hoult","Hugh Keays-Byrne"],                               ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=hEJnMQG9ev8" },
  { id:8,  name:"John Wick",                  category:"Action",   description:"A retired hitman seeks vengeance against the gangsters who killed his dog and stole his car.",                     cast:["Keanu Reeves","Michael Nyqvist","Alfie Allen","Willem Dafoe","Dean Winters"],                    ott:["Prime Video","JioCinema"],      trailer:"https://www.youtube.com/watch?v=2AUmvWm5ZDQ" },
  { id:9,  name:"Avengers: Endgame",          category:"Action",   description:"The Avengers assemble one final time to undo the destruction caused by Thanos and save the universe.",             cast:["Robert Downey Jr.","Chris Evans","Scarlett Johansson","Mark Ruffalo","Chris Hemsworth"],          ott:["Hotstar"],                      trailer:"https://www.youtube.com/watch?v=TcMBFSGVi1c" },
  { id:10, name:"The Godfather",              category:"Crime",    description:"The patriarch of a crime dynasty transfers power to his reluctant son in a world of violence and loyalty.",        cast:["Marlon Brando","Al Pacino","James Caan","Robert Duvall","Diane Keaton"],                         ott:["Prime Video"],                  trailer:"https://www.youtube.com/watch?v=sY1S34973zA" },
  { id:11, name:"Pulp Fiction",               category:"Crime",    description:"Interlocking crime stories in Los Angeles told through dark humor and a nonlinear narrative.",                     cast:["John Travolta","Uma Thurman","Samuel L. Jackson","Bruce Willis","Harvey Keitel"],                 ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=s7EdQ4FqbhY" },
  { id:12, name:"Goodfellas",                 category:"Crime",    description:"Henry Hill and his life inside the mob from his teenage years through witness protection.",                         cast:["Ray Liotta","Robert De Niro","Joe Pesci","Lorraine Bracco","Paul Sorvino"],                       ott:["Prime Video","JioCinema"],      trailer:"https://www.youtube.com/watch?v=qo5jJpHtI1Y" },
  { id:13, name:"Joker",                      category:"Crime",    description:"A failed comedian descends into madness and transforms into a violent criminal icon in Gotham.",                   cast:["Joaquin Phoenix","Robert De Niro","Zazie Beetz","Frances Conroy","Brett Cullen"],                 ott:["Prime Video","JioCinema"],      trailer:"https://www.youtube.com/watch?v=zAGVQLHvwOY" },
  { id:14, name:"The Shawshank Redemption",   category:"Drama",    description:"A banker forms a deep friendship with a fellow prisoner while planning a daring prison escape.",                   cast:["Tim Robbins","Morgan Freeman","Bob Gunton","William Sadler","Clancy Brown"],                      ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=6hB3S9bIaco" },
  { id:15, name:"Forrest Gump",               category:"Drama",    description:"A man with a low IQ witnesses and influences decades of American history while searching for love.",                cast:["Tom Hanks","Robin Wright","Gary Sinise","Sally Field","Mykelti Williamson"],                      ott:["Prime Video","Hotstar"],        trailer:"https://www.youtube.com/watch?v=bLvqoHBptjg" },
  { id:16, name:"Whiplash",                   category:"Drama",    description:"A young jazz drummer is pushed to his absolute limits by a ruthless and abusive music instructor.",                cast:["Miles Teller","J.K. Simmons","Paul Reiser","Melissa Benoist","Austin Stowell"],                   ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=7d_jQycdQGo" },
  { id:17, name:"Parasite",                   category:"Drama",    description:"A poor family schemes to work for a wealthy household but a dark secret threatens their plan.",                    cast:["Song Kang-ho","Lee Sun-kyun","Cho Yeo-jeong","Choi Woo-shik","Park So-dam"],                     ott:["Prime Video","Mubi"],           trailer:"https://www.youtube.com/watch?v=5xH0HfJHsaY" },
  { id:18, name:"Oppenheimer",                category:"Drama",    description:"The story of J. Robert Oppenheimer who leads the project to develop the atomic bomb during World War II.",         cast:["Cillian Murphy","Emily Blunt","Matt Damon","Robert Downey Jr.","Florence Pugh"],                  ott:["Prime Video","JioCinema"],      trailer:"https://www.youtube.com/watch?v=uYPbbksJxIg" },
  { id:19, name:"Get Out",                    category:"Horror",   description:"A young man visits his girlfriend's family estate and uncovers a deeply disturbing and sinister secret.",          cast:["Daniel Kaluuya","Allison Williams","Bradley Whitford","Catherine Keener"],                        ott:["Prime Video","Hotstar"],        trailer:"https://www.youtube.com/watch?v=DzfpyUB60YY" },
  { id:20, name:"A Quiet Place",              category:"Horror",   description:"A family must live in near total silence to survive monsters that hunt entirely by sound.",                        cast:["Emily Blunt","John Krasinski","Millicent Simmonds","Noah Jupe"],                                  ott:["Prime Video","Hotstar"],        trailer:"https://www.youtube.com/watch?v=WR7cc5t7tv8" },
  { id:21, name:"Hereditary",                 category:"Horror",   description:"After a family matriarch dies, her daughter uncovers deeply disturbing secrets about their ancestry.",             cast:["Toni Collette","Alex Wolff","Milly Shapiro","Gabriel Byrne","Ann Dowd"],                          ott:["Prime Video","Mubi"],           trailer:"https://www.youtube.com/watch?v=V6wWKNij_1M" },
  { id:22, name:"La La Land",                 category:"Romance",  description:"A jazz musician and an aspiring actress fall in love in Los Angeles while chasing their dreams.",                  cast:["Ryan Gosling","Emma Stone","John Legend","Rosemarie DeWitt","J.K. Simmons"],                      ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=0pdqf4P9MB8" },
  { id:23, name:"Titanic",                    category:"Romance",  description:"A poor artist and a wealthy woman fall in love aboard the ill-fated RMS Titanic ocean liner.",                    cast:["Leonardo DiCaprio","Kate Winslet","Billy Zane","Kathy Bates","Frances Fisher"],                   ott:["Prime Video","Hotstar"],        trailer:"https://www.youtube.com/watch?v=2e-eXJ6HgkQ" },
  { id:24, name:"The Notebook",               category:"Romance",  description:"A poor young man falls in love with a rich girl and their love story is told through memories.",                   cast:["Ryan Gosling","Rachel McAdams","James Garner","Gena Rowlands","Sam Shepard"],                     ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=FC6biTjEyZw" },
  { id:25, name:"Dangal",                     category:"Sports",   description:"A former wrestler trains his daughters to become world class wrestlers against all social norms.",                  cast:["Aamir Khan","Fatima Sana Shaikh","Sanya Malhotra","Sakshi Tanwar","Aparshakti Khurana"],           ott:["Netflix","Prime Video","Hotstar"], trailer:"https://www.youtube.com/watch?v=x_7YlGv9u1g" },
  { id:26, name:"3 Idiots",                   category:"Comedy",   description:"Two friends search for their lost companion while reminiscing about their engineering college days.",               cast:["Aamir Khan","R. Madhavan","Sharman Joshi","Kareena Kapoor","Boman Irani"],                        ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=xvszmNXdM4w" },
  { id:27, name:"PK",                         category:"Comedy",   description:"An alien stranded on Earth questions religious beliefs and superstitions in Indian society.",                      cast:["Aamir Khan","Anushka Sharma","Sushant Singh Rajput","Boman Irani","Sanjay Dutt"],                  ott:["Netflix","Prime Video"],        trailer:"https://www.youtube.com/watch?v=yjhDFAMxhKY" },
  { id:28, name:"Spirited Away",              category:"Animation",description:"A girl wanders into a spirit world and must work to rescue her parents who were turned into pigs.",               cast:["Daveigh Chase","Suzanne Pleshette","Miyu Irino","Mari Natsuki","Rumi Hiiragi"],                   ott:["Netflix"],                      trailer:"https://www.youtube.com/watch?v=ByXuk9QqQkk" },
  { id:29, name:"The Lion King",              category:"Animation",description:"A lion cub flees his kingdom after his father is murdered and must return to reclaim his throne.",                 cast:["Matthew Broderick","Jeremy Irons","James Earl Jones","Nathan Lane","Whoopi Goldberg"],             ott:["Hotstar"],                      trailer:"https://www.youtube.com/watch?v=4sj1MT05lAA" },
  { id:30, name:"RRR",                        category:"Action",   description:"Two revolutionary freedom fighters form a bond before rising against British colonial rule in India.",             cast:["Ram Charan","N.T. Rama Rao Jr.","Alia Bhatt","Ajay Devgn","Shriya Saran"],                        ott:["Netflix","Prime Video","Zee5"], trailer:"https://www.youtube.com/watch?v=f_vbAtFSEc0" },
];

// ═══════════════════════════════════════════════════════════
//  OTT & CATEGORY STYLES
// ═══════════════════════════════════════════════════════════
const OTT_STYLES = {
  "Netflix":     {bg:"#e5000022",text:"#ff4444",border:"#e5000055"},
  "Prime Video": {bg:"#00a8e822",text:"#00c2ff",border:"#00a8e855"},
  "Hotstar":     {bg:"#1f80e022",text:"#5eb8ff",border:"#1f80e055"},
  "JioCinema":   {bg:"#8b2be222",text:"#c084fc",border:"#8b2be255"},
  "Zee5":        {bg:"#6b21a822",text:"#a855f7",border:"#6b21a855"},
  "Mubi":        {bg:"#06403522",text:"#2dd4bf",border:"#06403555"},
  "SonyLIV":     {bg:"#c2410c22",text:"#fb923c",border:"#c2410c55"},
};
const CAT_COLORS = {
  "Sci-Fi":    {bg:"#0d2240",text:"#4db8ff",border:"#1a4a80"},
  "Action":    {bg:"#2a1000",text:"#ff7730",border:"#6b2800"},
  "Crime":     {bg:"#1a0a2a",text:"#c084fc",border:"#4a1a6a"},
  "Drama":     {bg:"#0a1a10",text:"#4ade80",border:"#1a4a2a"},
  "Horror":    {bg:"#1a0808",text:"#f87171",border:"#4a1010"},
  "Romance":   {bg:"#1a0a18",text:"#f472b6",border:"#4a1a40"},
  "Comedy":    {bg:"#1a1800",text:"#facc15",border:"#4a4000"},
  "Sports":    {bg:"#001a1a",text:"#2dd4bf",border:"#004a4a"},
  "Animation": {bg:"#0a1020",text:"#818cf8",border:"#1a2a5a"},
  "Thriller":  {bg:"#1a1000",text:"#fb923c",border:"#4a2800"},
  "Mystery":   {bg:"#0a0a20",text:"#a5b4fc",border:"#2a2a5a"},
  "Biography": {bg:"#101a10",text:"#86efac",border:"#2a4a2a"},
};
const getCat = cat => CAT_COLORS[cat] || {bg:"#1a1a2a",text:"#aaa",border:"#333"};

// ═══════════════════════════════════════════════════════════
//  TF-IDF ENGINE
// ═══════════════════════════════════════════════════════════
const STOP = new Set(["a","an","the","and","or","but","in","on","at","to","for","of","with","by","from","is","are","was","were","be","been","his","her","their","who","that","this","as","into","after","while","he","she","it","its","they","them","has","have","about","most"]);
const tok = t => t.toLowerCase().replace(/[^a-z\s]/g,"").split(/\s+/).filter(w=>w.length>2&&!STOP.has(w));
function buildVectors(movies) {
  const docs = movies.map(m=>tok(`${m.name} ${m.name} ${m.name} ${m.category} ${m.category} ${m.category} ${m.description} ${m.cast.join(" ")}`));
  const N=docs.length, df={}, idf={};
  docs.forEach(d=>[...new Set(d)].forEach(w=>{df[w]=(df[w]||0)+1;}));
  Object.keys(df).forEach(w=>{idf[w]=Math.log(N/df[w]);});
  return docs.map(d=>{const tf={},v={};d.forEach(w=>{tf[w]=(tf[w]||0)+1;});Object.keys(tf).forEach(w=>{v[w]=(tf[w]/d.length)*(idf[w]||0);});return v;});
}
function cosSim(v1,v2){const c=Object.keys(v1).filter(k=>v2[k]);if(!c.length)return 0;const dot=c.reduce((s,k)=>s+v1[k]*v2[k],0),m1=Math.sqrt(Object.values(v1).reduce((s,v)=>s+v*v,0)),m2=Math.sqrt(Object.values(v2).reduce((s,v)=>s+v*v,0));return m1&&m2?dot/(m1*m2):0;}
function getRecs(movies,vecs,id,n=5){const i=movies.findIndex(m=>m.id===id);if(i===-1)return[];return movies.map((m,j)=>({movie:m,score:j===i?-1:cosSim(vecs[i],vecs[j])})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,n);}

// ═══════════════════════════════════════════════════════════
//  SHARED TINY COMPONENTS
// ═══════════════════════════════════════════════════════════
function OttBadge({p}){const s=OTT_STYLES[p]||{bg:"#1e233422",text:"#888",border:"#1e234455"};return <span style={{fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:5,background:s.bg,color:s.text,border:`1px solid ${s.border}`,whiteSpace:"nowrap"}}>{p}</span>;}
function CatBadge({category,size="sm"}){const c=getCat(category);return <span style={{fontSize:size==="sm"?10:12,fontWeight:700,padding:size==="sm"?"2px 7px":"3px 10px",borderRadius:20,background:c.bg,color:c.text,border:`1px solid ${c.border}`,whiteSpace:"nowrap"}}>{category}</span>;}
function Stars({value,onChange,size=18}){const[hov,setHov]=useState(0);return <div style={{display:"flex",gap:2}}>{[1,2,3,4,5].map(s=><span key={s} onClick={()=>onChange&&onChange(s)} onMouseEnter={()=>onChange&&setHov(s)} onMouseLeave={()=>onChange&&setHov(0)} style={{fontSize:size,cursor:onChange?"pointer":"default",color:s<=(hov||value)?"#F5C518":"#2a2a3a",transition:"color 0.15s",userSelect:"none"}}>★</span>)}</div>;}
function SimilarityBar({score}){const p=Math.round(score*100),c=p>=60?"#22c55e":p>=35?"#f59e0b":"#ef4444";return <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{flex:1,height:5,borderRadius:3,background:"#1e2340",overflow:"hidden"}}><div style={{width:`${p}%`,height:"100%",background:c,borderRadius:3,transition:"width 0.5s"}}/></div><span style={{fontSize:11,fontWeight:700,color:c,minWidth:32}}>{p}%</span></div>;}

// ─── TRAILER BUTTON ───────────────────────────────────────
function TrailerBtn({url}){
  if(!url)return null;
  return(
    <a href={url} target="_blank" rel="noreferrer"
      style={{display:"inline-flex",alignItems:"center",gap:6,background:"#ff000022",border:"1px solid #ff000055",borderRadius:8,padding:"7px 14px",color:"#ff4444",fontWeight:700,fontSize:12,textDecoration:"none",transition:"all 0.2s"}}
      onMouseEnter={e=>e.currentTarget.style.background="#ff000044"}
      onMouseLeave={e=>e.currentTarget.style.background="#ff000022"}>
      ▶ Watch Trailer
    </a>
  );
}

// ─── RATING CHART ─────────────────────────────────────────
function RatingChart({movies,reviews}){
  const data = movies
    .map(m=>{const mr=reviews[m.id]||[];return mr.length?{name:m.name.length>14?m.name.slice(0,13)+"…":m.name,avg:parseFloat((mr.reduce((s,r)=>s+r.rating,0)/mr.length).toFixed(1)),count:mr.length,full:m.name}:null;})
    .filter(Boolean)
    .sort((a,b)=>b.avg-a.avg)
    .slice(0,10);
  if(!data.length)return(
    <div style={{textAlign:"center",padding:"48px 0",color:"#444"}}>
      <div style={{fontSize:36,marginBottom:10}}>📊</div>
      <div style={{fontSize:14}}>No ratings yet.</div>
      <div style={{fontSize:12,marginTop:4,color:"#333"}}>Rate some movies as a User to see the chart here.</div>
    </div>
  );
  const CustomTooltip=({active,payload})=>{
    if(active&&payload&&payload.length)return(
      <div style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:8,padding:"10px 14px"}}>
        <div style={{fontWeight:700,color:"#eee",fontSize:13,marginBottom:4}}>{payload[0].payload.full}</div>
        <div style={{color:"#F5C518",fontWeight:700}}>★ {payload[0].value}/5</div>
        <div style={{color:"#555",fontSize:11}}>{payload[0].payload.count} review(s)</div>
      </div>
    );
    return null;
  };
  return(
    <div>
      <div style={{fontSize:11,color:"#555",letterSpacing:1,marginBottom:16}}>TOP RATED MOVIES (by user reviews)</div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{top:0,right:40,left:10,bottom:0}}>
          <XAxis type="number" domain={[0,5]} tick={{fill:"#555",fontSize:11}} tickCount={6}/>
          <YAxis type="category" dataKey="name" tick={{fill:"#888",fontSize:11}} width={110}/>
          <Tooltip content={<CustomTooltip/>} cursor={{fill:"#1e234022"}}/>
          <Bar dataKey="avg" radius={[0,4,4,0]}>
            {data.map((entry,i)=>{
              const c=i===0?"#F5C518":i===1?"#aaa":i===2?"#cd7f32":"#4db8ff";
              return <Cell key={i} fill={c}/>;
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── MOVIE DETAIL ─────────────────────────────────────────
function MovieDetail({movie,reviews,onAddReview,onCastSearch}){
  const[showForm,setShowForm]=useState(false),[rating,setRating]=useState(0),[text,setText]=useState(""),[name,setName]=useState("");
  const avg=reviews.length?(reviews.reduce((s,r)=>s+r.rating,0)/reviews.length).toFixed(1):null;
  const inp={width:"100%",background:"#0A0E1A",border:"1px solid #1e2340",borderRadius:8,padding:"9px 12px",color:"#eee",fontSize:13,outline:"none",boxSizing:"border-box"};
  const submit=()=>{if(!rating||!text.trim())return;onAddReview({reviewer:name.trim()||"Anonymous",rating,text:text.trim(),time:new Date().toLocaleDateString("en-IN")});setRating(0);setText("");setName("");setShowForm(false);};
  return(
    <div style={{background:"#0d1120",border:"1px solid #F5C51844",borderRadius:14,padding:"20px 22px",marginBottom:20}}>
      <div style={{fontSize:10,color:"#F5C518",letterSpacing:2,fontWeight:700,marginBottom:8}}>SELECTED MOVIE</div>
      <h2 style={{fontSize:20,fontWeight:900,color:"#fff",margin:"0 0 8px"}}>{movie.name}</h2>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
        <CatBadge category={movie.category} size="md"/>
        {avg&&<div style={{display:"flex",alignItems:"center",gap:5,background:"#F5C51822",border:"1px solid #F5C51844",borderRadius:20,padding:"2px 8px"}}><Stars value={Math.round(avg)} size={12}/><span style={{color:"#F5C518",fontWeight:700,fontSize:12}}>{avg}</span><span style={{color:"#555",fontSize:10}}>({reviews.length})</span></div>}
      </div>
      <p style={{color:"#888",fontSize:13,lineHeight:1.7,margin:"0 0 14px"}}>{movie.description}</p>

      {/* CAST */}
      <div style={{marginBottom:12}}>
        <div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:7}}>CAST — click an actor to find their movies</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {movie.cast.map(a=>(
            <button key={a} onClick={()=>onCastSearch(a)}
              style={{fontSize:11,padding:"4px 11px",borderRadius:20,background:"#13172a",border:"1px solid #1e2340",color:"#aac",cursor:"pointer",transition:"all 0.2s"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#1e2a4a";e.currentTarget.style.borderColor="#4db8ff44";e.currentTarget.style.color="#4db8ff";}}
              onMouseLeave={e=>{e.currentTarget.style.background="#13172a";e.currentTarget.style.borderColor="#1e2340";e.currentTarget.style.color="#aac";}}>
              🎭 {a}
            </button>
          ))}
        </div>
      </div>

      {/* OTT */}
      <div style={{marginBottom:14}}>
        <div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:6}}>AVAILABLE ON</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{movie.ott?.length>0?movie.ott.map(p=><OttBadge key={p} p={p}/>):<span style={{fontSize:11,color:"#444"}}>Not listed</span>}</div>
      </div>

      {/* BUTTONS ROW */}
      <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:0}}>
        <button onClick={()=>setShowForm(!showForm)} style={{background:showForm?"#1e2340":"linear-gradient(135deg,#F5C518,#d4a800)",border:"none",borderRadius:8,padding:"8px 16px",color:showForm?"#888":"#000",fontWeight:700,fontSize:12,cursor:"pointer"}}>
          {showForm?"Cancel":"⭐ Rate & Review"}
        </button>
        <TrailerBtn url={movie.trailer}/>
      </div>

      {showForm&&<div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #1e2340"}}>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name (optional)" style={{...inp,marginBottom:8}}/>
        <div style={{marginBottom:8}}><div style={{fontSize:10,color:"#555",marginBottom:5}}>RATING</div><Stars value={rating} onChange={setRating} size={26}/></div>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Share your thoughts..." style={{...inp,minHeight:70,resize:"vertical",marginBottom:10}}/>
        <button onClick={submit} style={{background:rating&&text.trim()?"linear-gradient(135deg,#F5C518,#d4a800)":"#1e2340",border:"none",borderRadius:8,padding:"9px 20px",color:rating&&text.trim()?"#000":"#555",fontWeight:700,fontSize:12,cursor:rating&&text.trim()?"pointer":"not-allowed"}}>Submit</button>
      </div>}
      {reviews.length>0&&<div style={{marginTop:16,paddingTop:16,borderTop:"1px solid #1e2340"}}>
        <div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:10}}>REVIEWS ({reviews.length})</div>
        {reviews.map((r,i)=><div key={i} style={{background:"#0A0E1A",border:"1px solid #1e2340",borderRadius:8,padding:"10px 12px",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4,marginBottom:4}}>
            <div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontWeight:700,color:"#ddd",fontSize:12}}>{r.reviewer}</span><Stars value={r.rating} size={12}/></div>
            <span style={{color:"#444",fontSize:10}}>{r.time}</span>
          </div>
          <p style={{color:"#888",fontSize:12,margin:0,lineHeight:1.6}}>{r.text}</p>
        </div>)}
      </div>}
    </div>
  );
}

// ─── REC CARD ─────────────────────────────────────────────
function RecCard({rec,rank,onSelect}){
  const[hov,setHov]=useState(false);const c=getCat(rec.movie.category);
  return(
    <div onClick={()=>onSelect(rec.movie)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?"#13172a":"#0d1120",border:`1px solid ${hov?c.border:"#1e2340"}`,borderRadius:10,padding:"13px 15px",cursor:"pointer",transform:hov?"translateX(3px)":"none",transition:"all 0.2s",display:"flex",gap:12,alignItems:"flex-start"}}>
      <div style={{minWidth:32,height:32,borderRadius:"50%",background:rank===1?"#F5C518":rank===2?"#aaa":rank===3?"#cd7f32":"#1e2340",color:rank<=3?"#000":"#666",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,flexShrink:0}}>{rank}</div>
      <div style={{flex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3,flexWrap:"wrap"}}>
          <span style={{fontWeight:800,fontSize:14,color:"#eee"}}>{rec.movie.name}</span>
          <CatBadge category={rec.movie.category}/>
        </div>
        <p style={{color:"#666",fontSize:12,lineHeight:1.6,margin:"0 0 5px"}}>{rec.movie.description}</p>
        {/* CAST below description */}
        <p style={{color:"#4db8ff",fontSize:11,margin:"0 0 6px"}}>🎭 {rec.movie.cast.slice(0,3).join(" · ")}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:7}}>{rec.movie.ott?.map(p=><OttBadge key={p} p={p}/>)}</div>
        {rec.movie.trailer&&<a href={rec.movie.trailer} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()} style={{fontSize:11,color:"#ff4444",textDecoration:"none",fontWeight:600}}>▶ Trailer</a>}
        <div style={{marginTop:7}}><SimilarityBar score={rec.score}/></div>
      </div>
    </div>
  );
}

// ─── MOVIE GRID CARD ──────────────────────────────────────
function GridCard({m,reviews,onSelect,castSearch,onCastClick}){
  const mr=reviews[m.id]||[],avg=mr.length?(mr.reduce((s,r)=>s+r.rating,0)/mr.length).toFixed(1):null;
  const[hov,setHov]=useState(false);
  const highlighted=castSearch&&m.cast.some(a=>a.toLowerCase().includes(castSearch.toLowerCase()));
  return(
    <div onClick={()=>onSelect(m)}
      style={{background:"#0d1120",border:`1px solid ${highlighted?"#F5C51866":hov?getCat(m.category).border:"#1e2340"}`,borderRadius:10,padding:"12px 13px",cursor:"pointer",transition:"all 0.2s",boxShadow:highlighted?"0 0 12px #F5C51822":"none"}}
      onMouseEnter={e=>{setHov(true);}} onMouseLeave={e=>{setHov(false);}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
        <div style={{fontWeight:700,fontSize:12,color:"#ddd",lineHeight:1.3,flex:1}}>{m.name}</div>
        {avg&&<span style={{fontSize:10,color:"#F5C518",fontWeight:700,marginLeft:5}}>★{avg}</span>}
      </div>
      <div style={{marginBottom:5}}><CatBadge category={m.category}/></div>
      <div style={{display:"flex",flexWrap:"wrap",gap:3,marginBottom:6}}>{m.ott?.slice(0,2).map(p=><OttBadge key={p} p={p}/>)}</div>
      {/* CAST displayed below */}
      <div style={{marginBottom:6}}>
        <div style={{fontSize:9,color:"#444",marginBottom:4,letterSpacing:0.5}}>CAST</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
          {m.cast.slice(0,3).map(a=>{
            const isMatch=castSearch&&a.toLowerCase().includes(castSearch.toLowerCase());
            return(
              <span key={a} onClick={e=>{e.stopPropagation();onCastClick(a);}}
                style={{fontSize:9,padding:"2px 6px",borderRadius:10,background:isMatch?"#F5C51822":"#13172a",border:`1px solid ${isMatch?"#F5C51866":"#1e2340"}`,color:isMatch?"#F5C518":"#668",cursor:"pointer",transition:"all 0.15s"}}>
                {a}
              </span>
            );
          })}
        </div>
      </div>
      <p style={{color:"#555",fontSize:10,margin:0,lineHeight:1.5,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{m.description}</p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  LOGIN PAGE
// ═══════════════════════════════════════════════════════════
function LoginPage({onLogin}){
  const[role,setRole]=useState("user"),[pass,setPass]=useState(""),[err,setErr]=useState("");
  const doLogin=()=>{if(role==="admin"&&pass!=="admin123"){setErr("Wrong password. Hint: admin123");return;}setErr("");onLogin(role);};
  const inp={width:"100%",background:"#0d1120",border:"1px solid #1e2340",borderRadius:10,padding:"11px 14px",color:"#eee",fontSize:14,outline:"none",boxSizing:"border-box"};
  return(
    <div style={{minHeight:"100vh",background:"#0A0E1A",display:"flex",alignItems:"center",justifyContent:"center",padding:20,fontFamily:"Inter,system-ui,sans-serif"}}>
      <div style={{width:"100%",maxWidth:380}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <div style={{fontSize:34,fontWeight:900,letterSpacing:-1,marginBottom:6}}><span style={{color:"#F5C518"}}>CINE</span><span style={{color:"#E94560"}}>MATCH</span></div>
          <div style={{fontSize:11,color:"#555",letterSpacing:3}}>MOVIE RECOMMENDATION SYSTEM</div>
          <div style={{fontSize:10,color:"#333",marginTop:3,letterSpacing:1}}>TASK 03 · AI INTERNSHIP · INCODEVISION</div>
        </div>
        <div style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:16,padding:26}}>
          <div style={{fontSize:15,fontWeight:800,color:"#eee",marginBottom:18}}>Sign In</div>
          <div style={{marginBottom:16}}>
            <div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:7}}>SIGN IN AS</div>
            <div style={{display:"flex",gap:8}}>
              {["user","admin"].map(r=><button key={r} onClick={()=>{setRole(r);setPass("");setErr("");}} style={{flex:1,padding:"9px 0",borderRadius:10,fontWeight:700,fontSize:13,cursor:"pointer",border:"none",transition:"all 0.2s",background:role===r?(r==="admin"?"#E9456022":"#F5C51822"):"#13172a",color:role===r?(r==="admin"?"#E94560":"#F5C518"):"#555",outline:role===r?`1px solid ${r==="admin"?"#E9456066":"#F5C51866"}`:"1px solid #1e2340"}}>{r==="user"?"👤 User":"🔐 Admin"}</button>)}
            </div>
          </div>
          {role==="admin"&&<div style={{marginBottom:16}}>
            <div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:7}}>ADMIN PASSWORD</div>
            <input type="password" value={pass} onChange={e=>{setPass(e.target.value);setErr("");}} onKeyDown={e=>e.key==="Enter"&&doLogin()} placeholder="Enter admin password" style={inp}/>
            {err&&<div style={{color:"#E94560",fontSize:11,marginTop:5}}>{err}</div>}
          </div>}
          <div style={{background:"#0A0E1A",border:"1px solid #1e2340",borderRadius:8,padding:"9px 12px",marginBottom:16,fontSize:11,color:"#555",lineHeight:1.7}}>
            {role==="user"?<><strong style={{color:"#F5C518"}}>User:</strong> Browse movies · Get recommendations · Search by cast · Rate & Review · Watch Trailers · View Rating Chart</>:<><strong style={{color:"#E94560"}}>Admin:</strong> Add/delete movies · View all reviews · Rating chart.</>}
          </div>
          <button onClick={doLogin} style={{width:"100%",padding:"11px 0",borderRadius:10,fontWeight:800,fontSize:14,cursor:"pointer",border:"none",background:role==="admin"?"linear-gradient(135deg,#E94560,#c0314f)":"linear-gradient(135deg,#F5C518,#d4a800)",color:role==="admin"?"#fff":"#000"}}>
            Continue as {role==="user"?"User":"Admin"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  USER PAGE
// ═══════════════════════════════════════════════════════════
function UserPage({movies,vectors,reviews,onAddReview,onLogout}){
  const[search,setSearch]=useState(""),[selected,setSelected]=useState(null),[recs,setRecs]=useState([]);
  const[filterCat,setFilterCat]=useState("All"),[showDrop,setShowDrop]=useState(false);
  const[castSearch,setCastSearch]=useState(""),[tab,setTab]=useState("browse"); // browse | chart

  const cats=["All",...Object.keys(CAT_COLORS)];
  const catCounts=useMemo(()=>{const c={};movies.forEach(m=>{c[m.category]=(c[m.category]||0)+1;});return c;},[movies]);

  const filtered=useMemo(()=>{
    const q=search.toLowerCase();
    return movies.filter(m=>{
      const mS=!q||m.name.toLowerCase().includes(q)||m.category.toLowerCase().includes(q)||m.cast.some(a=>a.toLowerCase().includes(q))||m.ott.some(o=>o.toLowerCase().includes(q));
      const mC=filterCat==="All"||m.category===filterCat;
      const mCast=!castSearch||m.cast.some(a=>a.toLowerCase().includes(castSearch.toLowerCase()));
      return mS&&mC&&mCast;
    });
  },[search,filterCat,castSearch,movies]);

  const pick=m=>{setSelected(m);setSearch(m.name);setShowDrop(false);setRecs(getRecs(movies,vectors,m.id));setTab("browse");};
  const clear=()=>{setSelected(null);setSearch("");setRecs([]);setShowDrop(false);};
  const handleCastSearch=actor=>{setCastSearch(actor);setSelected(null);setSearch("");setRecs([]);setTab("browse");};
  const clearCast=()=>setCastSearch("");

  return(
    <div style={{minHeight:"100vh",background:"#0A0E1A",fontFamily:"Inter,system-ui,sans-serif"}}>
      {/* NAV */}
      <div style={{borderBottom:"1px solid #1e2340",padding:"12px 20px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,background:"#0A0E1Aee",backdropFilter:"blur(10px)",zIndex:10}}>
        <div style={{fontWeight:900,fontSize:17}}><span style={{color:"#F5C518"}}>CINE</span><span style={{color:"#E94560"}}>MATCH</span></div>
        <div style={{flex:1}}/>
        {/* NAV TABS */}
        <button onClick={()=>{setTab("browse");clear();clearCast();}} style={{background:tab==="browse"?"#F5C51822":"transparent",border:"none",borderRadius:8,padding:"6px 12px",color:tab==="browse"?"#F5C518":"#555",fontWeight:700,fontSize:12,cursor:"pointer",outline:tab==="browse"?"1px solid #F5C51844":"none"}}>🎬 Browse</button>
        <button onClick={()=>setTab("chart")} style={{background:tab==="chart"?"#F5C51822":"transparent",border:"none",borderRadius:8,padding:"6px 12px",color:tab==="chart"?"#F5C518":"#555",fontWeight:700,fontSize:12,cursor:"pointer",outline:tab==="chart"?"1px solid #F5C51844":"none"}}>📊 Rating Chart</button>
        <div style={{background:"#F5C51822",border:"1px solid #F5C51844",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,color:"#F5C518"}}>👤 User</div>
        <button onClick={onLogout} style={{background:"#1e2340",border:"none",borderRadius:7,padding:"6px 12px",color:"#888",fontSize:11,cursor:"pointer"}}>Sign Out</button>
      </div>

      {/* RATING CHART TAB */}
      {tab==="chart"&&(
        <div style={{maxWidth:720,margin:"0 auto",padding:"32px 20px"}}>
          <div style={{fontSize:10,color:"#E94560",letterSpacing:3,fontWeight:700,marginBottom:8}}>ANALYTICS</div>
          <h2 style={{fontSize:22,fontWeight:900,margin:"0 0 4px"}}>Rating Chart</h2>
          <p style={{color:"#555",fontSize:13,margin:"0 0 28px"}}>Top rated movies based on user reviews.</p>
          <div style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:14,padding:24}}>
            <RatingChart movies={movies} reviews={reviews}/>
          </div>
        </div>
      )}

      {/* BROWSE TAB */}
      {tab==="browse"&&(
        <>
          <div style={{textAlign:"center",padding:"28px 20px 20px",borderBottom:"1px solid #1e2340"}}>
            <div style={{fontSize:10,letterSpacing:4,color:"#E94560",fontWeight:700,marginBottom:10}}>TASK 03 · AI INTERNSHIP · INCODEVISION</div>
            <h1 style={{fontSize:"clamp(20px,4vw,38px)",fontWeight:900,margin:"0 0 8px",letterSpacing:-1,lineHeight:1.1}}>Movie Recommendation <span style={{color:"#F5C518"}}>System</span></h1>
            <p style={{color:"#555",fontSize:12,maxWidth:400,margin:"0 auto 16px"}}>Select a movie · Get recommendations · Search by cast · Rate & Review · Watch Trailers</p>
            <div style={{display:"flex",justifyContent:"center",gap:7,flexWrap:"wrap"}}>
              {[{s:"01",l:"Select movie"},{s:"02",l:"Similarity computed"},{s:"03",l:"Recommendations"}].map(({s,l})=>(
                <div key={s} style={{display:"flex",alignItems:"center",gap:5,background:"#0d1120",border:"1px solid #1e2340",borderRadius:7,padding:"5px 10px"}}>
                  <span style={{fontSize:10,fontWeight:900,color:"#F5C518"}}>{s}</span>
                  <span style={{fontSize:11,color:"#888"}}>{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{maxWidth:720,margin:"0 auto",padding:"20px 16px"}}>

            {/* Cast search banner */}
            {castSearch&&(
              <div style={{background:"#F5C51811",border:"1px solid #F5C51844",borderRadius:10,padding:"10px 14px",marginBottom:14,display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:12,color:"#F5C518",fontWeight:700}}>🎭 Showing movies with: <strong>{castSearch}</strong></span>
                <span style={{fontSize:11,color:"#888"}}>({filtered.length} found)</span>
                <button onClick={clearCast} style={{marginLeft:"auto",background:"#1e2340",border:"none",borderRadius:6,padding:"4px 10px",color:"#888",fontSize:11,cursor:"pointer"}}>✕ Clear</button>
              </div>
            )}

            {/* Category pills */}
            <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:12}}>
              {cats.map(cat=>{const active=filterCat===cat,c=getCat(cat);return(
                <button key={cat} onClick={()=>{setFilterCat(cat);if(search)setShowDrop(true);}} style={{padding:"4px 11px",borderRadius:20,fontSize:11,fontWeight:600,cursor:"pointer",border:"none",transition:"all 0.2s",background:active?(cat==="All"?"#F5C51822":c.bg):"transparent",color:active?(cat==="All"?"#F5C518":c.text):"#555",outline:active?`1px solid ${cat==="All"?"#F5C51866":c.border}`:"1px solid #1e2340"}}>
                  {cat}{cat!=="All"&&<span style={{opacity:0.5}}> ({catCounts[cat]||0})</span>}
                </button>
              );})}
            </div>

            {/* Search box */}
            <div style={{position:"relative",marginBottom:7}}>
              <div style={{display:"flex",alignItems:"center",background:"#0d1120",border:`2px solid ${selected?"#F5C518":"#1e2340"}`,borderRadius:11,padding:"10px 14px",gap:9,transition:"border-color 0.2s"}}>
                <span style={{fontSize:16}}>🎬</span>
                <input value={search} onChange={e=>{setSearch(e.target.value);setShowDrop(true);setSelected(null);setRecs([]);setCastSearch("");}} onFocus={()=>setShowDrop(true)} placeholder="Search by title, actor, genre or OTT..." style={{flex:1,background:"none",border:"none",outline:"none",color:"#eee",fontSize:14,fontWeight:selected?700:400}}/>
                {(search||selected)&&<button onClick={clear} style={{background:"#1e2340",border:"none",borderRadius:"50%",width:24,height:24,color:"#888",cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>×</button>}
              </div>
              {showDrop&&search&&!selected&&(
                <div style={{position:"absolute",top:"calc(100% + 5px)",left:0,right:0,background:"#0d1120",border:"1px solid #1e2340",borderRadius:11,zIndex:50,maxHeight:260,overflowY:"auto",boxShadow:"0 16px 48px #000a"}}>
                  {filtered.length===0?<div style={{padding:"14px 18px",color:"#555",fontSize:13}}>No movies found.</div>:filtered.map(m=>(
                    <div key={m.id} onClick={()=>pick(m)} style={{padding:"10px 14px",cursor:"pointer",borderBottom:"1px solid #1a1e30"}} onMouseEnter={e=>e.currentTarget.style.background="#13172a"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <div style={{fontWeight:600,fontSize:13,color:"#ddd",marginBottom:3}}>{m.name}</div>
                      <div style={{fontSize:10,color:"#667",marginBottom:3}}>🎭 {m.cast.slice(0,3).join(", ")}</div>
                      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}><CatBadge category={m.category}/>{m.ott?.slice(0,2).map(p=><OttBadge key={p} p={p}/>)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={{fontSize:11,color:"#444",marginBottom:18}}>{movies.length} movies · click cast name to search actor's movies</div>

            {/* GRID */}
            {!selected&&(
              <div>
                <div style={{fontSize:11,color:"#555",letterSpacing:1,marginBottom:10}}>ALL MOVIES</div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(175px,1fr))",gap:9}}>
                  {filtered.map(m=><GridCard key={m.id} m={m} reviews={reviews} onSelect={pick} castSearch={castSearch} onCastClick={handleCastSearch}/>)}
                </div>
              </div>
            )}

            {/* SELECTED + RECS */}
            {selected&&(
              <div>
                <MovieDetail movie={selected} reviews={reviews[selected.id]||[]} onAddReview={r=>onAddReview(selected.id,r)} onCastSearch={handleCastSearch}/>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                  <div><div style={{fontSize:10,color:"#555",letterSpacing:2,marginBottom:3}}>RECOMMENDATIONS</div><div style={{fontSize:16,fontWeight:800,color:"#eee"}}>Similar to <span style={{color:"#F5C518"}}>{selected.name}</span></div></div>
                  <div style={{fontSize:11,color:"#444",background:"#0d1120",border:"1px solid #1e2340",borderRadius:7,padding:"5px 10px"}}>Top {recs.length}</div>
                </div>
                <div style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:9,padding:"10px 14px",marginBottom:13,display:"flex",gap:10}}>
                  <span style={{fontSize:15}}>⚙️</span>
                  <div style={{fontSize:11,color:"#555",lineHeight:1.6}}><strong style={{color:"#777"}}>Name, category, description & cast</strong> → TF-IDF vectors → Cosine similarity → Top matches for <strong style={{color:"#F5C518"}}>{selected.name}</strong>.</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:9}}>{recs.map((rec,i)=><RecCard key={rec.movie.id} rec={rec} rank={i+1} onSelect={pick}/>)}</div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  ADMIN PAGE
// ═══════════════════════════════════════════════════════════
function AdminPage({movies,reviews,onAddMovie,onDeleteMovie,onLogout}){
  const[tab,setTab]=useState("movies"),[search,setSearch]=useState(""),[msg,setMsg]=useState("");
  const[name,setName]=useState(""),[cat,setCat]=useState("Action"),[desc,setDesc]=useState(""),[cast,setCast]=useState(""),[ott,setOtt]=useState([]);
  const ALL_CATS=Object.keys(CAT_COLORS),ALL_OTT=Object.keys(OTT_STYLES);
  const toggleOtt=p=>setOtt(prev=>prev.includes(p)?prev.filter(x=>x!==p):[...prev,p]);
  const allRev=movies.flatMap(m=>(reviews[m.id]||[]).map(r=>({...r,movieName:m.name})));
  const filtM=movies.filter(m=>!search||m.name.toLowerCase().includes(search.toLowerCase())||m.category.toLowerCase().includes(search.toLowerCase()));
  const handleAdd=()=>{
    if(!name.trim()||!desc.trim()){setMsg("Fill in name and description.");return;}
    if(movies.find(m=>m.name.toLowerCase()===name.trim().toLowerCase())){setMsg("Movie already exists.");return;}
    onAddMovie({name:name.trim(),category:cat,description:desc.trim(),cast:cast.split(",").map(s=>s.trim()).filter(Boolean),ott:[...ott],trailer:""});
    setName("");setCat("Action");setDesc("");setCast("");setOtt([]);setMsg("✅ Added!");setTab("movies");
  };
  const inp={width:"100%",background:"#0A0E1A",border:"1px solid #1e2340",borderRadius:9,padding:"10px 13px",color:"#eee",fontSize:13,outline:"none",boxSizing:"border-box"};
  const tbtn=a=>({padding:"7px 16px",borderRadius:7,fontWeight:700,fontSize:12,cursor:"pointer",border:"none",transition:"all 0.2s",background:a?"#E9456022":"transparent",color:a?"#E94560":"#555",outline:a?"1px solid #E9456044":"1px solid transparent"});
  return(
    <div style={{minHeight:"100vh",background:"#0A0E1A",fontFamily:"Inter,system-ui,sans-serif"}}>
      <div style={{borderBottom:"1px solid #1e2340",padding:"12px 20px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,background:"#0A0E1Aee",backdropFilter:"blur(10px)",zIndex:10}}>
        <div style={{fontWeight:900,fontSize:17}}><span style={{color:"#F5C518"}}>CINE</span><span style={{color:"#E94560"}}>MATCH</span></div>
        <div style={{flex:1}}/>
        <div style={{background:"#E9456022",border:"1px solid #E9456044",borderRadius:20,padding:"3px 10px",fontSize:11,fontWeight:700,color:"#E94560"}}>🔐 Admin</div>
        <button onClick={onLogout} style={{background:"#1e2340",border:"none",borderRadius:7,padding:"6px 12px",color:"#888",fontSize:11,cursor:"pointer"}}>Sign Out</button>
      </div>
      <div style={{maxWidth:780,margin:"0 auto",padding:"28px 16px"}}>
        <div style={{marginBottom:22}}>
          <div style={{fontSize:10,color:"#E94560",letterSpacing:3,fontWeight:700,marginBottom:6}}>ADMIN DASHBOARD</div>
          <h1 style={{fontSize:24,fontWeight:900,margin:"0 0 3px",letterSpacing:-0.5}}>Manage Movies</h1>
          <p style={{color:"#555",fontSize:12,margin:0}}>Add or delete movies · View reviews · Rating chart.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:22}}>
          {[{label:"Movies",value:movies.length,color:"#F5C518"},{label:"Reviews",value:allRev.length,color:"#4ade80"},{label:"Categories",value:[...new Set(movies.map(m=>m.category))].length,color:"#c084fc"}].map(({label,value,color})=>(
            <div key={label} style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:11,padding:"14px 16px"}}>
              <div style={{fontSize:26,fontWeight:900,color,lineHeight:1,marginBottom:3}}>{value}</div>
              <div style={{fontSize:11,color:"#555"}}>{label}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:7,marginBottom:20,borderBottom:"1px solid #1e2340",paddingBottom:13}}>
          <button style={tbtn(tab==="movies")} onClick={()=>{setTab("movies");setMsg("");}}>📋 All Movies</button>
          <button style={tbtn(tab==="add")} onClick={()=>{setTab("add");setMsg("");}}>➕ Add Movie</button>
          <button style={tbtn(tab==="reviews")} onClick={()=>{setTab("reviews");setMsg("");}}>⭐ Reviews</button>
          <button style={tbtn(tab==="chart")} onClick={()=>{setTab("chart");setMsg("");}}>📊 Rating Chart</button>
        </div>

        {tab==="movies"&&<div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search movies..." style={{...inp,marginBottom:12}}/>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {filtM.map(m=>{const mr=reviews[m.id]||[],avg=mr.length?(mr.reduce((s,r)=>s+r.rating,0)/mr.length).toFixed(1):null;return(
              <div key={m.id} style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:11,padding:"13px 16px"}}>
                <div style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div style={{display:"flex",flexWrap:"wrap",alignItems:"center",gap:6,marginBottom:4}}>
                      <span style={{fontWeight:700,fontSize:13,color:"#ddd"}}>{m.name}</span>
                      <CatBadge category={m.category}/>
                      {avg&&<span style={{fontSize:11,color:"#F5C518",fontWeight:700}}>★{avg}({mr.length})</span>}
                      {m.addedByAdmin&&<span style={{fontSize:9,background:"#E9456022",color:"#E94560",border:"1px solid #E9456044",borderRadius:10,padding:"1px 6px"}}>NEW</span>}
                    </div>
                    <p style={{color:"#555",fontSize:11,margin:"0 0 6px",lineHeight:1.5}}>{m.description}</p>
                    {m.cast?.length>0&&<div style={{fontSize:10,color:"#4db8ff",marginBottom:5}}>🎭 {m.cast.join(", ")}</div>}
                    <div style={{display:"flex",flexWrap:"wrap",gap:4}}>{m.ott?.map(p=><OttBadge key={p} p={p}/>)}{(!m.ott||m.ott.length===0)&&<span style={{fontSize:10,color:"#333"}}>No OTT</span>}</div>
                  </div>
                  <button onClick={()=>onDeleteMovie(m.id)} style={{background:"#1a0808",border:"1px solid #4a1010",borderRadius:7,padding:"5px 10px",color:"#f87171",fontSize:11,cursor:"pointer",fontWeight:600,whiteSpace:"nowrap",flexShrink:0}}>🗑 Delete</button>
                </div>
              </div>
            );})}
          </div>
        </div>}

        {tab==="add"&&<div style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:14,padding:24}}>
          <div style={{fontSize:15,fontWeight:800,color:"#eee",marginBottom:18}}>Add New Movie</div>
          <div style={{marginBottom:12}}><div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:6}}>MOVIE NAME *</div><input value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Inception" style={inp}/></div>
          <div style={{marginBottom:12}}><div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:6}}>CATEGORY *</div><select value={cat} onChange={e=>setCat(e.target.value)} style={{...inp,appearance:"none",cursor:"pointer"}}>{ALL_CATS.map(c=><option key={c} value={c}>{c}</option>)}</select></div>
          <div style={{marginBottom:12}}><div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:6}}>DESCRIPTION *</div><textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Short movie description..." style={{...inp,minHeight:75,resize:"vertical"}}/></div>
          <div style={{marginBottom:12}}><div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:6}}>CAST (comma-separated)</div><input value={cast} onChange={e=>setCast(e.target.value)} placeholder="Actor One, Actor Two, Actor Three" style={inp}/></div>
          <div style={{marginBottom:18}}>
            <div style={{fontSize:10,color:"#555",letterSpacing:1,marginBottom:8}}>OTT PLATFORMS</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:7}}>{ALL_OTT.map(p=><button key={p} onClick={()=>toggleOtt(p)} style={{padding:"5px 12px",borderRadius:7,fontWeight:700,fontSize:11,cursor:"pointer",border:"none",transition:"all 0.2s",background:ott.includes(p)?OTT_STYLES[p].bg:"#13172a",color:ott.includes(p)?OTT_STYLES[p].text:"#555",outline:ott.includes(p)?`1px solid ${OTT_STYLES[p].border}`:"1px solid #1e2340"}}>{ott.includes(p)?"✓ ":""}{p}</button>)}</div>
          </div>
          {name&&desc&&<div style={{background:"#0A0E1A",border:"1px solid #1e2340",borderRadius:9,padding:"12px 14px",marginBottom:14}}>
            <div style={{fontSize:10,color:"#444",marginBottom:6}}>PREVIEW</div>
            <div style={{fontWeight:700,fontSize:13,color:"#ddd",marginBottom:4}}>{name}</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:6}}><CatBadge category={cat}/>{ott.map(p=><OttBadge key={p} p={p}/>)}</div>
            {cast&&<div style={{fontSize:10,color:"#4db8ff",marginBottom:4}}>🎭 {cast}</div>}
            <p style={{color:"#666",fontSize:11,margin:0,lineHeight:1.5}}>{desc}</p>
          </div>}
          {msg&&<div style={{fontSize:12,marginBottom:14,padding:"9px 12px",borderRadius:7,color:msg.startsWith("✅")?"#4ade80":"#f87171",background:msg.startsWith("✅")?"#0a2a10":"#1a0808",border:`1px solid ${msg.startsWith("✅")?"#1a4a2a":"#4a1010"}`}}>{msg}</div>}
          <button onClick={handleAdd} style={{background:"linear-gradient(135deg,#E94560,#c0314f)",border:"none",borderRadius:9,padding:"11px 26px",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer"}}>➕ Add to Dataset</button>
        </div>}

        {tab==="reviews"&&<div>
          {allRev.length===0?<div style={{textAlign:"center",padding:"44px 0",color:"#444"}}><div style={{fontSize:32,marginBottom:10}}>⭐</div><div style={{fontSize:14}}>No reviews yet.</div></div>:
          <div style={{display:"flex",flexDirection:"column",gap:9}}>{allRev.map((r,i)=><div key={i} style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:11,padding:"12px 16px"}}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:7,marginBottom:5}}>
              <div style={{display:"flex",alignItems:"center",gap:7}}><span style={{fontWeight:700,color:"#ddd",fontSize:12}}>{r.reviewer}</span><span style={{fontSize:10,color:"#555"}}>on</span><span style={{fontWeight:700,color:"#F5C518",fontSize:12}}>{r.movieName}</span><Stars value={r.rating} size={12}/></div>
              <span style={{color:"#444",fontSize:10}}>{r.time}</span>
            </div>
            <p style={{color:"#888",fontSize:12,margin:0,lineHeight:1.6}}>{r.text}</p>
          </div>)}</div>}
        </div>}

        {tab==="chart"&&<div style={{background:"#0d1120",border:"1px solid #1e2340",borderRadius:14,padding:24}}>
          <RatingChart movies={movies} reviews={reviews}/>
        </div>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  ROOT
// ═══════════════════════════════════════════════════════════
export default function App(){
  const[page,setPage]=useState("login"),[movies,setMovies]=useState(INITIAL_MOVIES),[reviews,setReviews]=useState({});
  const vectors=useMemo(()=>buildVectors(movies),[movies]);
  const addMovie=m=>{const id=Math.max(...movies.map(x=>x.id))+1;setMovies(p=>[...p,{...m,id,addedByAdmin:true}]);};
  const delMovie=id=>{setMovies(p=>p.filter(m=>m.id!==id));setReviews(p=>{const n={...p};delete n[id];return n;});};
  const addReview=(mid,r)=>setReviews(p=>({...p,[mid]:[...(p[mid]||[]),r]}));
  if(page==="login")return <LoginPage onLogin={setPage}/>;
  if(page==="user")return <UserPage movies={movies} vectors={vectors} reviews={reviews} onAddReview={addReview} onLogout={()=>setPage("login")}/>;
  if(page==="admin")return <AdminPage movies={movies} reviews={reviews} onAddMovie={addMovie} onDeleteMovie={delMovie} onLogout={()=>setPage("login")}/>;
}
