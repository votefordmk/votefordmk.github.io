
        function shareOnFB() {
            var url = "https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(window.location.href);
            window.open(url, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            return false;
        }

        function shareOntwitter() {
            var url = "https://twitter.com/intent/tweet?url="+window.location.href;
            TwitterWindow = window.open(url, 'TwitterWindow', width = 600, height = 300);
            return false;
        }

        function shareOnwhatsapp(url) {
            window.open(
                "whatsapp://send?text="+window.location.href,
                '_blank'
            );
        }