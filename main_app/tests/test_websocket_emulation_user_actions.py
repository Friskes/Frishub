from channels.testing import ChannelsLiveServerTestCase

# pip install selenium
from selenium.webdriver import ChromeOptions, Chrome
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
# END       - прыгнуть в конец строки
# PAGE_UP   - перейти в самое начало текста
# PAGE_DOWN - перейти в самый конец текста
# ENTER     - перейти на следующую строку
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support.ui import Select
# скачиваем chromedriver и указываем путь к нему в классе Chrome
# https://sites.google.com/chromium.org/driver/downloads

from time import sleep


#############################################################################

class UtilsForTest:

    driver: Chrome

    def _send_keys(self, *args):
        ActionChains(self.driver).send_keys(*args).perform()
        # ActionChains(self.driver).key_down(*args).perform()


    def open_new_window(self):
        self.driver.execute_script('window.open("about:blank", "_blank");')
        self.switch_to_window(-1)


    def close_all_new_windows(self):
        while len(self.driver.window_handles) > 1:
            self.switch_to_window(-1)
            self.driver.execute_script('window.close();')
        if len(self.driver.window_handles) == 1:
            self.switch_to_window(0)


    def switch_to_window(self, window_index):
        self.driver.switch_to.window(self.driver.window_handles[window_index])


    def open_site(self, page_url):
        # заходим на страницу по url
        self.driver.get(self.live_server_url + page_url)


    def click_on_ele(self, ele_name):
        element = self.get_ele(ele_name)
        ActionChains(self.driver).click(element).perform()


    def write_text_in_field(self, ele_name, text):
        self.click_on_ele(ele_name) # берём в фокус
        # self.driver.execute_script(f'document.getElementById({ele_name}).focus();') # берём в фокус
        self._send_keys(text) # вводим текст


    def set_option_in_select(self, ele_name, arg):
        select = Select(self.get_ele(ele_name))
        select.select_by_visible_text(arg) # выбрать option в select по тексту
        # select.select_by_value(arg) # выбрать option в select по значению
        # select.select_by_index(14)


    def get_ele(self, ele_name):
        return self.driver.find_element(By.CSS_SELECTOR, ele_name)


    def get_ele_val(self, ele_name):
        return self.get_ele(ele_name).get_property('value')

#############################################################################

# python manage.py test main_app.tests.test_websocket_emulation_user_actions.TestDevChat

# https://channels.readthedocs.io/en/latest/tutorial/part_4.html
class TestDevChat(ChannelsLiveServerTestCase, UtilsForTest):

    serve_static = True # emulate StaticLiveServerTestCase

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        try:
            options = ChromeOptions()
            # убрать из лога ошибки связанные с USB
            options.add_experimental_option('excludeSwitches', ['enable-logging'])
            cls.driver = Chrome(
                executable_path=r'C:\Users\79897\Downloads\chromedriver_win32\chromedriver.exe',
                options=options
            )
        except:
            super().tearDownClass()
            raise


    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()
        super().tearDownClass()


    def test_basic_functionality(self):
        try:
            self.open_site('/dev-chat/fb133adc-7f3f-41b4-a8d0-d5089a7a82c1')
            sleep(1)
            self.entering_chat_room('User1')
            sleep(1)
            self.open_new_window()
            sleep(1)
            self.open_site('/dev-chat/fb133adc-7f3f-41b4-a8d0-d5089a7a82c1')
            sleep(1)
            self.switch_to_window(0)
            sleep(1)
            self.set_option_in_select('#id_programming_languages', 'python')
            sleep(1)
            self.set_option_in_select('#id_select_pixels', '24px')
            sleep(1)
            self.write_text_in_field('.ace_text-input', 'def my_func(a, b):\n\treturn a**b\nprint(my_func(2, 2))')
            sleep(1)
            self.switch_to_window(1)
            sleep(1)
            self.set_option_in_select('#id_programming_languages', 'javascript')
            sleep(1)
            self.set_option_in_select('#id_select_pixels', '14px')
            sleep(1)
            self.click_on_ele('.ace_text-input') # берём в фокус для send_keys
            sleep(1)
            self._send_keys(Keys.PAGE_DOWN, Keys.ENTER, Keys.ENTER)
            sleep(1)
            self.write_text_in_field('.ace_text-input', 'function my_func(a, b):\n\treturn a**b;\nconsole.log(my_func(2, 2));')
            sleep(1)
            self.switch_to_window(0)
            sleep(1)
            # self.assertTrue(
            #     "hello" not in self._chat_log_value,
            #     "Message was improperly received by window 2 from window 1",
            # )
        finally:
            self.close_all_new_windows()


    def entering_chat_room(self, username):
        self._send_keys(username) # вводим имя пользователя
        sleep(1)
        self.click_on_ele('#login-popup-btn') # кликаем по кнопке подтвердить имя пользователя

        # WebDriverWait(self.driver, 1).until(
        #     lambda _: username == self.get_ele_val('#dev_chat_username'),
        #     'Никнейм не соответствует переданному',
        # )

#############################################################################
