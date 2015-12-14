/* your code should go here */


// You can modify this object, add functions that you need
var MailModel = {
  /**
   * Initialises the model with the "database" of filter rules
   * and messages. This function is already implemented.
   */
   init : function(){
     this.rules = rules;
     this.messages = msgs;
   }, 
    
    load: function(rules,msgs){
        this.rules=rules;
        this.messages=msgs;
    }
  
   /**
    * Filters out messages in the "database" that match the spam rules.
    * @return an array of messages, excluding those that match the filter rules.
    */
    filter : function(){        
        var filtro=[];
         var flag;
        var cont=0;
        var mess=this.messages;
        var rul=this.rules;
        for(i=0;i<mess.length;i++){
            flag=false;
            for(j=0;j<rul.length;j++){
 if((mess[i].from.indexOf("@"+rul[j].from)>0)||(mess[i].subject.indexOf(rul[j].subject))>0){
                    flag=true; 
                }
            }
            if(flag==false){
                filtro[cont]=mess[i];
                cont++;
            }
        }
       return filtro; 
     }
};

var octopus={
    
    init:function(){
        MailModel.init();
        view.init();
    },
    
    getMessage: function(){
        return MailModel.messages;
    },
    
    getFilter: function(){
        return MailModel.filter();
    }
};

var view={
    init: function(){
        var messaggi=[];
        messaggi=octopus.getMessage();
        for(i=0;i<messaggi.length;i++){
        var tmp= "<li><h5>"+messaggi[i].from+"</h5><h6>"+messaggi[i].subject+"</h6></li>";
        $(".result").append(tmp);
        }
        view.filter();
    },
    
    filter: function(){
        var filtro=[];
        $(".btn-filter").click(function(){
            $(".result").empty();
            filtro=octopus.getFilter();
            alert(filtro.length);
            for(i=0;i<filtro.length;i++){
                var tmp= "<li><h1>"+filtro[i].from+"</h5><h6>"+filtro[i].subject+"</h6></li>";
                $(".result").append(tmp);
            }
        });
    }
    
}


// Example of usage:
// MailModel.init()
// MailModel.filter() 
//  -> ["carlo@gmail.com", "trentose2@googlegroups.com"]


// We suggest to use js patters. 
// you can add here your views and controllers if you decide to do so.



$(document).ready(function(){
        octopus.init();
});