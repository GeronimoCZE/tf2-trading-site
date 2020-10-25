const express = require('express');
const path = require('path');
const app = express();

app.use('/public',express.static(path.join(__dirname,'static')));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.get('/:userQuery',(req,res)=>{
    unusuals = unusuals;
    res.render('index', {data : {userQuery: req.params.userQuery, unusuals: unusuals}});
});
app.get('/views/sell',(req,res)=>{
  unusuals = unusuals;
  addSlot = "<div class='item'></div>"
  res.render('sell', {data : {userQuery: req.params.userQuery, unusuals: unusuals, addSlot: addSlot}});
});

app.get('/views/buy',(req,res)=>{
  unusuals = unusuals;
  lengh = unusuals.length;
  item_lengh = items.length;
  slots = [];
  item_slots = [];
  for(var i = 0; i < lengh; i++) {
    var s1 = "<div onmouseover='itemHover(this.id)' onmouseout='itemHoverOut(this.id)' class='item' id='unusual"; /* +i*/
    var s2 = "' select='null' name='" ;
    unusuals[i] = unusuals[i].replace("'", "/");
    var unu = unusuals[i];
    var s3 = "' onclick='getValue(this.id)' effect='" ;
    var eff = effects[i];
    var s4 = "' value='"
    var val = values[i];
    var s5 = "'><img src='"
    var ur = urls[i];
    var s6 = "' alt=''></div>";
    var y = i;
    addSlot = s1 + y + s2 + unu + s3 + eff + s4 + val + s5 + ur + s6;
    slots.push(addSlot);
  }
  for(var ii = 0; ii < item_lengh; ii++) {
    var s1 = "<div onmouseover='itemHover(this.id)' onmouseout='itemHoverOut(this.id)' class='item' id='item"; /* +i*/
    var s2 = "' select='null' name='" ;
    items[ii] = items[ii].replace("'", "/");
    var ite = items[ii];
    var s3 = "' onclick='getValue(this.id)' effect='" ;
    var eff = " ";
    var s4 = "' value='"
    var val = "1";
    var s5 = "'><img src='"
    var ur = other_urls[ii];
    var s6 = "' alt=''></div>";
    var y = ii;
    addItemSlot = s1 + y + s2 + ite + s3 + eff + s4 + val + s5 + ur + s6;
    item_slots.push(addItemSlot);
  }

  res.render('buy', {data : {userQuery: req.params.userQuery, unusuals: unusuals, slots: slots, lengh: lengh, item_slots: item_slots, item_lengh: item_lengh}});
});

const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SteamCommunity = require('steamcommunity');
const steaminventory = require('get-steam-inventory');
const market = require('steam-market-pricing');

community = new SteamCommunity();
const backpacktf = require("backpacktf");
const client = new SteamUser();
const id = "76561198124728984";
const url_prefix = "https://community.cloudflare.steamstatic.com/economy/image/";

/*
const logOnOptions = {
};

client.logOn(logOnOptions);

client.on('loggedOn', () => {
  console.log('Logged into Steam');

  client.setPersona(SteamUser.EPersonaState.Online, "Geronimo's Store");
  client.gamesPlayed(440);
});

steaminventory.getinventory(440, id, 2).then(data => {
  console.log(data.marketnames.length);
  for(var i = 0; i < data.marketnames.length; i++) {
    if (data.marketnames[i].includes("Unusual")) {
        if(data.marketnames[i].includes("(")){
          console.log(data.marketnames[i]) /* marketname*/
          /*
          console.log(data.items[i].descriptions[1].value) /* Unusual effect for weapons*/
          /*
          console.log(url_prefix + data.items[i].icon_url) /* Icon URL */
          /*
        } else{
          console.log(data.marketnames[i]) /* marketname*/ /*
          console.log(data.items[i].descriptions[0].value) /* Unusual effect */
          /*
          console.log(url_prefix + data.items[i].icon_url) /* Icon URL */
          /*
        };
    }
  } 
}).catch(err => console.log(err));
*/
var unusuals = [];
    urls = [];
    other_urls = [];
    items = [];
    effects = [];
    values = [];
    itemPrices = [];
    KsAssets = [];
community.getUserInventory(id, 440, 2, true, (err, inventory) => {
  if (err) {
      throw err;
  }
  for(var i = 0; i < inventory.length; i++) {
    var name = inventory[i].market_name;
    var url = url_prefix + inventory[i].icon_url;
    if (inventory[i].market_name.includes("Unusual") == true ) {
        if(inventory[i].market_name.includes("(")){
            if (inventory[i].descriptions[0].value.includes("Effect") == true){
              var effect = inventory[i].descriptions[0].value;
            } else if(inventory[i].descriptions[1].value.includes("Effect") == true){
                var effect = inventory[i].descriptions[1].value;
            } else{
                var effect = inventory[i].descriptions[2].value;
            };
            unusuals.push(name);
            urls.push(url);
            effects.push(effect);
            values.push('2');
        } else if(name.includes("Unusualifier") == true){
            /*console.log(inventory[i].icon_url);*/
            var effect = " "
            unusuals.push(name);
            urls.push(url);
            effects.push(effect);
            values.push('2');
        } else if (name.includes("Taunt") == true){
            /*unusuals.push(inventory[i].market_name)*/
            if (inventory[i].descriptions[0].value.includes("Effect") == true){
                var effect = inventory[i].descriptions[0].value;
            } else if(inventory[i].descriptions[1].value.includes("Effect") == true){
                var effect = inventory[i].descriptions[1].value;
            } else{
                var effect = inventory[i].descriptions[2].value;
            };
            unusuals.push(name);
            urls.push(url);
            effects.push(effect);
            values.push('2');
        } else{
            if (inventory[i].descriptions[0].value.includes("Effect") == true){
              var effect = inventory[i].descriptions[0].value;
            } else if(inventory[i].descriptions[1].value.includes("Effect") == true){
                var effect = inventory[i].descriptions[1].value;
            } else if(inventory[i].descriptions[2].value.includes("Effect") == true){
              var effect = inventory[i].descriptions[2].value;
            } else{
                var effect = inventory[i].descriptions[3].value;
            };
            unusuals.push(name);
            urls.push(url);
            effects.push(effect);
            values.push('2');
        };
    } else {
        /* banned items */
        if (name.includes("Key") || name.includes("Case") || name.includes("Crate") || name.includes("Refined") || name.includes("Duty Ticket") || name.includes("Scrap Metal")){
          
        } else {
          items.push(name);
          other_urls.push(url);
          var asset = [];
          if (name.includes("Killstreak")){
            /*
            for (var y = 0; y < 10; y++) {
              asset.push(inventory[i].descriptions[y].value);
            }
            KsAssets.push(asset); */
          }
        }
    }
}});


app.listen(3000);
