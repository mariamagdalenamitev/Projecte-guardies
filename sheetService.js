/*
    No tocar
    Les següents línies es connecten amb google per comprovar que l'usuari és correcte i quina informació de la seva sessió
    es descarregarà. Una vegada autenticat correctament es descarrega un token que es guarda a
    la sessió del navegador (localStorage). Després per fer cada consulta s'enviarà aquest token per comprovar que l'usuari
    encara està autenticat correctament.
 */


// Funcions originals comentades

async function getDadesFila(rang){
    const peticioFetch = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1XmS4EsZRTMp4AQ4MXUp5MqufLRUbtFl96EpGbw2-WGg/values/"+rang+"?majorDimension=COLUMNS",{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    });
    const resultat = await peticioFetch.json();
    return resultat.values;
}

async function getDadesColumna(rang){
    const peticioFetch = await fetch("https://sheets.googleapis.com/v4/spreadsheets/1XmS4EsZRTMp4AQ4MXUp5MqufLRUbtFl96EpGbw2-WGg/values/"+rang,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }
    });
    const resultat = await peticioFetch.json();
    return resultat.values;
}

/*FI no tocar*/

// Matriu per simular les dades del full de guàrdies
const guardies = [
    ["Tasca", "Dilluns 1r Pati", "Dilluns 2n pati", "Dimarts 1r Pati", "Dimarts 2n Pati", "Dimecres 1r Pati", "Dimecres 2n Pati", "Dijous 1r Pati", "Dijous 2n Pati", "Divendres 1r Pati", "Divendres 2n Pati"],
    ["Verd 0", "JR", "JPM", "MB", "FD", "JR", "JPM", "MB", "FD", "MB", "FD"],
    ["Groc 0", "XM", "BV", "BD", "HT", "XM", "BV", "BD", "HT", "BD", "HT"],
    ["Verd 1", "PR", "BB", "FF", "XM", "PR", "BB", "FF", "XM", "FF", "XM"],
    ["Groc 1", "NM", "MM", "TR", "NB", "NM", "MM", "TR", "NB", "TR", "NB"],
    ["Verd 2", "AB", "LG", "JR", "FD", "AB", "LG", "JR", "FD", "JR", "FD"],
    ["Groc 2", "SC", "VV", "BF", "TR", "SC", "VV", "BF", "TR", "BF", "TR"],
    ["Verd 3", "ML", "RM", "MM", "EE", "ML", "RM", "MM", "EE", "MM", "EE"],
    ["Groc 3", "JJ", "IA", "MP", "JR", "JJ", "IA", "MP", "JR", "MP", "JR"],
    ["Verd 4", "TR", "MP", "RT", "MB", "TR", "MP", "RT", "MB", "RT", "MB"],
    ["Groc 4", "OS", "AR", "EE", "NM", "OS", "AR", "EE", "NM", "EE", "NM"],
    ["Verd 5", "MV", "MC", "AS", "MV", "MV", "MC", "AS", "MV", "AS", "MV"],
    ["Groc 5", "MM", "BF", "AB", "VV", "MM", "BF", "AB", "VV", "AB", "VV"]
];

// Matriu per simular les dades del full de tasques
const tasques = [
    ["Tasca", "Descripció"],
    ["Verd 0", "Estar a la Sala de professorat o entrada per tal d’atendre a l’alumnat que ho necessiti."],
    ["Groc 0", "Suplir l’absència que hi pugui haver de qualque membre de l’equip de guàrdia. Si no hi ha absències ha de fer guàrdia activa per tot el centre. En tocar el timbre, ha de fer que l’alumnat entri a les aules. La guàrdia acaba quan tot l’alumnat és a les aules."],
    ["Verd 1", "Estar a la planta baixa. Comprovar que a les aules no hi hagi alumnes i tancar les aules. Si hi ha alumnes sempre han d’estar acompanyats del professor que els ha donat permís. Si algun alumne necessita anar a l’aula a cercar qualque cosa que sigui necessària, el professor de guàrdia li obrirà la porta. Quan faltin 3 minuts per tocar el timbre es començaran a obrir les aules."],
    ["Groc 1", "Estar al 1r pis i davant la biblioteca i farà davallar a l’alumnat cap a baix. Comprovar que a les aules no hi hagi alumnes i tancar les aules. Si hi ha alumnes sempre han d’estar acompanyats del professor que els ha donat permís. Si algun alumne necessita anar a l’aula a cercar qualque cosa que sigui necessària, el professor de guàrdia li obrirà la porta. Quan faltin 3 minuts per tocar el timbre es començaran a obrir les aules. En tocar el timbre, ha de fer que l’alumnat entri a les aules. La guàrdia acaba quan tot l’alumnat és a les aules."],
    ["Verd 2", "Estar a la barrera de l’entrada 5 min abans de tocar el timbre i vigilar que només surti a la part exterior l’alumnat de batxillerat i de CFGB amb un carnet per identificar-se."],
    ["Groc 2", "Estar davant l’entrada petita del gimnàs. Vigilar els abeuradors i la fila del bar per evitar conflictes. En tocar el timbre, ha de fer que l’alumnat entri a les aules. La guàrdia acaba quan tot l’alumnat és a les aules."],
    ["Verd 3", "Obrir els banys de les nines 3 min abans de tocar el timbre. Estar devora l’entrada dels banys controlant que l’alumnat estigui al bany el temps just i necessari i vigilant que es faci un bon ús de les instal·lacions i evitant l’excés d’aforament dins el bany (màxim 7). El bany ha de quedar tancat quan finalitzi l’esplai. La clau del bany és una clau d’aula."],
    ["Groc 3", "Vigilar la zona de la pista de davant els banys de les nines. En tocar el timbre, ha de fer que l’alumnat entri a les aules. La guàrdia acaba quan tot l’alumnat és a les aules."],
    ["Verd 3", "Obrir els banys dels nins 3 min abans de tocar el timbre. Estar devora l’entrada dels banys controlant que l’alumnat estigui al bany el temps just i necessari i vigilant que es faci un bon ús de les instal·lacions i evitant l’excés d’aforament dins el bany (màxim 7). El bany ha de quedar tancat quan finalitzi l’esplai. La clau del bany és una clau d’aula."],
    ["Groc 3", "Vigilar la zona de la pista de davant els banys dels nins. En tocar el timbre, ha de fer que l’alumnat entri a les aules. La guàrdia acaba quan tot l’alumnat és a les aules."],
    ["Verd 5", "Anar a consergeria a cercar les claus de les aules exteriors. Anar als banys exteriors per controlar que l’alumnat estigui al bany el temps just i necessari i vigilant que es faci un bon ús de les instal·lacions."],
    ["Groc 5", "Vigilar que no hi hagi alumnes per darrera les aules prefabricades i fer la volta per comprovar que totes les aules exteriors estiguin tancades. Quan faltin 3 minuts per tocar el timbre es començaran a obrir les aules. En tocar el timbre, ha de fer que l’alumnat entri a les aules i retornar les claus de les aules exteriors a consergeria. La guàrdia acaba quan tot l’alumnat és a les aules."]
];

// Funcions auxiliars per analitzar el rang
function parseRange(rang) {

    const [full, cel_les] = rang.split("!");
    const [colStart, rowStart] = cel_les.split(":")[0].match(/([A-Z]+)([0-9]+)/).slice(1, 3);
    const [colEnd, rowEnd] = cel_les.split(":")[1].match(/([A-Z]+)([0-9]+)/).slice(1, 3);

    return {
        full,
        colStartIdx: colStart.charCodeAt(0) - 65,
        colEndIdx: colEnd.charCodeAt(0) - 65,
        rowStartIdx: parseInt(rowStart) - 1,
        rowEndIdx: parseInt(rowEnd)
    };
}

function getSheetData(full) {

    if (full === "Guardies") {
        return guardies;
    } else if (full === "Tasques") {
        return tasques;
    } else {
        console.error("Full desconegut: ", full);
        return [];
    }
}

// Funcions que simulen el comportament original
/*function getDadesFila(rang) {

    const { full, colStartIdx, colEndIdx, rowStartIdx } = parseRange(rang);
    const sheetData = getSheetData(full);
    return sheetData.slice(rowStartIdx, rowStartIdx + 1).map(row => row.slice(colStartIdx, colEndIdx + 1))[0];
}*/

/*function getDadesColumna(rang) {

    const { full, colStartIdx, rowStartIdx, rowEndIdx } = parseRange(rang);
    const sheetData = getSheetData(full);
    return sheetData.slice(rowStartIdx, rowEndIdx).map(row => [row[colStartIdx]]);
}*/

function mostrarMapa(){
    window.location.href = 'mostra_mapa.html'
}

function mostrarCalendari(){
    window.location.href = 'calendari.html'
}

function mostrarExplicacio(){
    window.location.href = 'explicacio.html'
}

function mostrarHorari(){
    window.location.href = 'horari.html'
}
function tancarSessio(){
    window.location.href = 'index.html'
}
function tornarMenu(){
    window.location.href = 'menu.html'
}