const createFooter = () => {
    let footer = document.querySelector('footer');
    footer.innerHTML = `
    <div class="footer-content">
    <img src="Images/img/light-logo.png" class="logo" alt="">
    <div class="footer-ul-container">
        <ul class="category">
                <li class="category-title">men</li>
                <li><a href="#" class="footer-link">t-shirts</a></li>
                <li><a href="#" class="footer-link">sweatshirts</a></li>
                <li><a href="#" class="footer-link">shirts</a></li>
                <li><a href="#" class="footer-link">jeans</a></li>
                <li><a href="#" class="footer-link">trousers</a></li>
                <li><a href="#" class="footer-link">shoes</a></li>
                <li><a href="#" class="footer-link">casuals</a></li>
                <li><a href="#" class="footer-link">formals</a></li>
                <li><a href="#" class="footer-link">sports</a></li>
                <li><a href="#" class="footer-link">watch</a></li>
        </ul>
        <ul class="category">
            <li class="category-title">Women</li>
            <li><a href="#" class="footer-link">t-shirts</a></li>
            <li><a href="#" class="footer-link">sweatshirts</a></li>
            <li><a href="#" class="footer-link">shirts</a></li>
            <li><a href="#" class="footer-link">jeans</a></li>
            <li><a href="#" class="footer-link">trousers</a></li>
            <li><a href="#" class="footer-link">shoes</a></li>
            <li><a href="#" class="footer-link">casuals</a></li>
            <li><a href="#" class="footer-link">formals</a></li>
            <li><a href="#" class="footer-link">sports</a></li>
            <li><a href="#" class="footer-link">watch</a></li>
    </ul>
    </div>
    
</div>
<p class="footer-title">about company</p>
    <p class="info">It is an American multinational 
        technology company focusing on e-commerce, cloud computing, 
        online advertising, digital streaming, and artificial intelligence.</p>
        <p class="info">support emails - help@clothing.com .customersupport@clothing.com</p>
        <p class="info">telephone - 180 00 00 001,180 00 00 002</p>
        <div class="footer-social-container">
            <div>
                <a href="#" class="social-link">terms and conditions</a>
            </div>
            <div>
                <a href="#" class="social-link">Instagram</a>
                <a href="#" class="social-link">Facebook</a>
                <a href="#" class="social-link">Telegram</a>
                <a href="#" class="social-link">twitter</a>



            </div>
        </div>
        <p class="footer-credit">Clothing,Best apparels online Store</p>
    `;
}
    createFooter();