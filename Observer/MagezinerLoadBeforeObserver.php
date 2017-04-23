<?php

namespace Gil\Mageziner\Observer;


use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Gil\Mageziner\Block\Mageziner as MagezinerBlock;


class MagezinerLoadBeforeObserver implements ObserverInterface
{
    /**
     * @var _Mageziner
     */
    private $_mageziner;

    /**
     * MagezinerLoadBeforeObserver constructor.
     * @param MagezinerBlock $magezinerBlock
     */
    public function __construct(
        MagezinerBlock $magezinerBlock
    ) {
        $this->_mageziner = $magezinerBlock;
    }

    /**
     * @param Observer $observer
     * @return void
     */
    public function execute(\Magento\Framework\Event\Observer $observer)
    {
        /** @var \Magento\Framework\View\Layout $layout */
        $layout = $observer->getEvent()->getData('layout');
      
        /* Only load Layout Handle IF module enabled AND customer belongs to whitelisted customer group */
        if ($this->_mageziner->getConfig('design/mageziner/enable_frontend') && $this->_mageziner->withinSelectedGroup()) {
            $layout->getUpdate()->addHandle('mageziner_sidebar');
        }
    }
}