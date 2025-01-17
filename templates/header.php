<?php
/**
 * @var System $system
 */

?>

<link rel="stylesheet" type="text/css" href="<?= $system->getCssFileLink("ui_components/src/header/Header.css") ?>" />

<div id="headerContainer"></div>
<script type="module" src="<?= $system->getReactFile("header/Header") ?>"></script>
<script>
    const headerContainer = document.querySelector("#headerContainer");

        window.addEventListener('load', () => {
        ReactDOM.render(
            React.createElement(Header, {
                links: {
                    navigation_api: "<?= $system->router->api_links['navigation'] ?>",
                    logout_link: "<?= $system->router->base_url . "?logout=1" ?>",
                },
                navigationAPIData: {
                    headerMenu: <?= json_encode(
                        NavigationAPIPresenter::menuLinksResponse(
                            NavigationAPIManager::getHeaderMenu($system)
                        )
                    ) ?>
                },
            }),
            headerContainer
        );
    });
</script>