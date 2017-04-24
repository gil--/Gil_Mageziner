<?php
namespace Gil\Mageziner\Model\Adminhtml\Source;

use Magento\Customer\Model\ResourceModel\Group\Collection as GroupCollection;

/**
 * Class CustomerGroup
 */
class CustomerGroup implements \Magento\Framework\Option\ArrayInterface
{

    /**
    * Customer Group
    *
    * @var GroupCollection
    */
    protected $_customerGroup;

    /**
    * @param GroupCollection $customerGroup
    * @param array $data
    */
    public function __construct(
        GroupCollection $customerGroup
    ) {
        $this->_customerGroup = $customerGroup;
    }

    /**
    * Get customer groups
    * 
    * @return array
    */ 
    public function getCustomerGroups() {
        $customerGroups = $this->_customerGroup->toOptionArray();
        
        return $customerGroups;
    }

    /**
     * {@inheritdoc}
     */
    public function toOptionArray()
    {
        return $this->getCustomerGroups();
    }
}