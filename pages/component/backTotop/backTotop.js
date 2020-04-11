Component({
    properties:{
        backToTopShow:{
            type:Boolean,
            value:false
        }
    },
    data:{
    },
    methods:{
        backTotop(){
            wx.pageScrollTo({
                scrollTop:0
            });
        }

    },
    lifetimes:{
        attached:function(){
            // console.log(this.data.backToTopShow);
        }
    }
})