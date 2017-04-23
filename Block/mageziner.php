<?php
namespace Gil\Mageziner\Block;

/**
 * Mageziner Block
 * @package  Gil_Mageziner
 * @module   Mageziner
 * @author   Gil Greenberg
 */
class Mageziner extends \Magento\Framework\View\Element\Template
{
    /**
     * [__construct description].
     *
     * @param \Magento\Framework\View\Element\Template\Context                $context
     * @param \Magento\Framework\Registry                                     $coreRegistry
     * @param array                                                           $data
     */
    public function __construct(
        \Magento\Framework\View\Element\Template\Context $context,
        \Magento\Framework\App\Config\ScopeConfigInterface $scopeConfig,
        \Magento\Customer\Model\Session $customerSession,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->_scopeConfig = $scopeConfig;
        $this->_customerSession = $customerSession;
    }

    public function getConfig($config_path)
    {
        $store = $this->_storeManager->getStore()->getId();

        return $this->_scopeConfig->getValue(
            $config_path,
            \Magento\Store\Model\ScopeInterface::SCOPE_STORE
        );
    }

    /**
     *
     * Does the current user match the whitelisted groups? (Logged out users have a group ID of 0)
     *
     * @return bool
     */
    protected function withinSelectedGroup() {
        $customerGroupId = $this->_customerSession->getCustomerGroupId();
        $whitelistedGroupIds = explode(",", $this->getConfig('design/mageziner/customer_group')); // string is returned with multiple group IDs seperated by a ','

        if (in_array($customerGroupId, $whitelistedGroupIds)) {
            return true;
        }

        return false;
    }

    /**
     * @return
     */
    protected function _toHtml()
    {
        if ($this->getConfig('design/mageziner/enable_frontend') && $this->withinSelectedGroup()) {
            return parent::_toHtml();
        }

        return '';
    }
}