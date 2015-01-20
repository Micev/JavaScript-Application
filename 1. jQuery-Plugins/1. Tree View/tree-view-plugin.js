(function($){
    $.fn.treeView = function(){
        var $this = $(this);
        $this.click(function(e){
            $(e.target).children().toggleClass("visible");
            e.stopPropagation();
        });

        return $this;
    }
}(jQuery));
