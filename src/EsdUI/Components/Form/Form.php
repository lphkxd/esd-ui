<?php
/**
 * Created by PhpStorm.
 * User: yangyuance
 * Date: 2019/1/30
 * Time: 下午4:03
 */

namespace ESD\Plugins\EsdUI\Components\Form;

use ESD\Plugins\EsdUI\Beans\Layout;
use ESD\Plugins\EsdUI\Components\Layout\PageView;
use ESD\Plugins\EsdUI\EsdUI;

/**
 * Class Form
 * @method Assembly\Button button($name, $label)
 * @method Assembly\Checkbox checkbox($name, $label)
 * @method Assembly\ColorPicker colorpicker($name, $label)
 * @method Assembly\Date date($name, $label)
 * @method Assembly\Hidden hidden($name, $label)
 * @method Assembly\Html html($name, $label)
 * @method Assembly\Password password($name, $label)
 * @method Assembly\Radio radio($name, $label)
 * @method Assembly\Select select($name, $label)
 * @method Assembly\SelectPlus selectplus($name, $label)
 * @method Assembly\Slider slider($name, $label)
 * @method Assembly\Switchs switchs($name, $label)
 * @method Assembly\Text text($name, $label)
 * @method Assembly\Textarea textarea($name, $label)
 * @method Assembly\Transfer transfer($name, $label)
 * @method Assembly\Tree tree($name, $label)
 * @method Assembly\Upload upload($name, $label)
 * @method Assembly\WangEditor wangeditor($name, $label)
 * @package ESD\Plugins\EsdUI
 */
class Form extends Layout
{
    /**
     * Form's name
     * @var string
     */
    protected $name = '';

    /**
     * All assemblys have been registered
     * @var array
     */
    protected $extends = [];

    /**
     * has been Initialized assembly
     * @var array|Assembly
     */
    protected $assemblys = [];

    /**
     * Form tab's content
     * @var array|Tab
     */
    protected $tabs = [];

    /**
     * page footer
     * @var Footer
     */
    protected $footer = null;

    /**
     * @var array
     */
    protected $value = [];

    /**
     * Form constructor.
     * @param $name
     * @param \Closure|null $callback
     * @throws \Exception
     */
    public function __construct($name, \Closure $callback = null)
    {
        $this->setName($name);

        $this->registerBuiltInAssemblys();

        if ($callback instanceof \Closure) {
            return  call_user_func_array($callback, [$this]);
        }
    }

    /**
     * title registerBuiltInAssemblys
     * description
     * 2019/2/24 下午2:06
     * @return $this
     * @throws \Exception
     */
    protected function registerBuiltInAssemblys()
    {
        $this->setExtends([
            'button' => Assembly\Button::class,
            'checkbox' => Assembly\Checkbox::class,
            'colorpicker' => Assembly\ColorPicker::class,
            'date' => Assembly\Date::class,
            'hidden' => Assembly\Hidden::class,
            'html' => Assembly\Html::class,
            'password' => Assembly\Password::class,
            'radio' => Assembly\Radio::class,
            'select' => Assembly\Select::class,
            'selectplus' => Assembly\SelectPlus::class,
            'slider' => Assembly\Slider::class,
            'switchs' => Assembly\Switchs::class,
            'text' => Assembly\Text::class,
            'textarea' => Assembly\Textarea::class,
            'transfer' => Assembly\Transfer::class,
            'tree' => Assembly\Tree::class,
            'upload' => Assembly\Upload::class,
            'wangeditor' => Assembly\WangEditor::class,
        ]);

        //TODO:读取系统配置
        //judge thinkeradmin's config extends
//        if (config('thinkeradmin.form.extends')) {
//            $this->setExtends(config('thinkeradmin.form.extends'));
//        }

        return $this;
    }

    /**
     * title inline
     * description set inline or not inline
     * 2019/2/27 下午12:22
     * @param \Closure $inline
     * @return \Closure|Inline
     */
    public function inline(\Closure $inline)
    {
        $inline = (new Inline($this, $inline));

        $this->assemblys[] = $inline;

        return $inline;
    }

    /**
     * title tab
     * description
     * 2019/3/12 下午11:57
     * @param $tabName
     * @param \Closure $tab
     * @return \Closure|Tab
     */
    public function tab($tabName, \Closure $tab)
    {
        $tab = (new Tab($this, $tabName, $tab));

        $this->tabs[] = $tab;

        return $tab;
    }

    /**
     * title footer
     * description
     * 2019/2/25 下午11:26
     * @param \Closure $footer
     * @return Footer
     */
    public function footer(\Closure $footer = null)
    {
        if (is_null($this->footer)) {
            $this->footer = (new Footer($this, $footer));
            $this->assemblys[] = $this->footer;
        }
        return $this->footer;
    }

    /**
     * title show
     * description
     * 2019/3/3 下午8:59
     * @param \Closure|null $closure
     * @return mixed
     */
    public function show(\Closure $closure = null)
    {
        if ($closure instanceof \Closure) {
            return EsdUI::pageView(function (PageView $pageView) use ($closure) {
                call_user_func_array($closure,[$pageView,$this]);
                $pageView->card($this->render());
            })->render();
        } else {
            return EsdUI::pageView(function (PageView $pageView) {
                $pageView->card($this->render());
            })->render();
        }
    }

    /**
     * title render
     * description use for render each type
     * 2019/1/30 下午3:10
     * @return mixed
     */
    public function render()
    {
        //splicing assembly html
        $splicingHtml = "";
        foreach ($this->assemblys as $i => $v) {
            $splicingHtml .= '<div class="layui-form-item">' . $v->render() . '</div>';
        }
        //return all string
        return <<<HTML
<div class="layui-form" lay-filter="{$this->getName()}" id="{$this->getName()}">
{$this->parseTabs()}
{$splicingHtml}
</div>
HTML;
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * title setName
     * description
     * 2019/2/25 下午11:31
     * @param $name
     * @return $this
     */
    public function setName($name)
    {
        $this->name = str_replace(["'", '"', ' ', '.', '。', ',', '，', ':', '：', '/', '、'], "_", $name);
        return $this;
    }

    /**
     * title parseTabs
     * description
     * 2019/3/12 下午11:56
     * @return string
     */
    protected function parseTabs()
    {
        if (empty($this->tabs)) {
            return '';
        } else {
            //judge tabs and make string
            $tabsHtml = ['title' => [], 'content' => []];
            foreach ($this->tabs as $i => $v) {
                $tabsHtml['title'][] = "<li class='" . ($i == 0 ? 'layui-this' : '') . "'>" . $v->getTitle() . "</li>";
                $tabsHtml['content'][] = '<div class="layui-tab-item ' . ($i == 0 ? 'layui-show' : '') . '">' . $v->render() . '</div>';
            }

            return '<div class="layui-tab"><ul class="layui-tab-title">' . join("", $tabsHtml['title']) . '</ul><div class="layui-tab-content">' . join("", $tabsHtml['content']) . '</div>';
        }
    }

    /**
     * title __call
     * description find assembly
     * 2019/2/24 下午4:15
     * @param $method
     * @param $arguments
     * @return mixed
     * @throws \Exception
     */
    public function __call($method, $arguments)
    {
        if ($className = $this->getExtends($method)) {
            $assembly = new $className(...$arguments);
            $this->setAssemblys($assembly);
            return $assembly;
        }

        throw new \Exception("form extends not found " . $method);
    }

    /**
     * title getExtends
     * description
     * 2019/2/24 下午2:14
     * @param $name
     * @return mixed|string
     */
    public function getExtends($name)
    {
        $class = empty($this->extends[$name]) ? '' : $this->extends[$name];

        if (!empty($class) && class_exists($class)) {
            return $class;
        }

        return false;
    }

    /**
     * title setExtends
     * description
     * 2019/2/24 下午2:14
     * @param $name
     * @param null $class
     * @return $this
     * @throws \Exception
     */
    public function setExtends($name, $class = null)
    {
        if (is_null($class)) {
            if (is_array($name)) {
                $this->extends = array_merge($this->extends, $name);
            } else {
                throw new \Exception("form extend's name must be array when class is null");
            }
        } else {
            $this->extends[$name] = $class;
        }

        return $this;
    }

    /**
     * title setAssemblys
     * description
     * 2019/2/24 下午2:16
     * @param Assembly $assembly
     * @return $this
     */
    public function setAssemblys(Assembly $assembly)
    {
        $assembly->setForm($this)->setValue($this->getValue($assembly->getName()));

        $this->assemblys[] = $assembly;

        return $this;
    }

    /**
     * title getValue
     * description
     * 2019/2/28 上午11:24
     * @param null $name
     * @return array|mixed|string
     */
    public function getValue($name = null)
    {
        if (empty($name)) {
            return $this->value;
        } else {
            if (!isset($this->value[$name])) {
                return '';
            } else {
                return $this->value[$name];
            }
        }
    }

    /**
     * title setValue
     * description
     * 2019/2/28 上午11:21
     * @param $value
     * @return $this
     */
    public function setValue($value)
    {
        $this->value = $value;
        return $this;
    }
}